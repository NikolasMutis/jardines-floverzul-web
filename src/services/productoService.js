import { supabase } from "../config/supabaseClient";
import { uploadImage } from "./storageService";

const normalizeProduct = (product) => ({
  id: product.id,
  nombre: product.nombre || "Producto sin nombre",
  descripcion: product.descripcion || "",
  precio: product.precio ?? null,
  imagen: product.imagen || null,
  created_at: product.created_at || null,
});

export const crearProducto = async (producto) => {
  try {
    let imageUrl = producto.imagen || null;

    if (producto.imagenFile) {
      imageUrl = await uploadImage(producto.imagenFile, "productos");
    }

    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: imageUrl,
    };

    const { data, error } = await supabase.from("productos").insert([payload]).select();

    if (error) {
      console.error("Error creando producto:", error);
      if (error.code === "42501") {
        throw new Error(
          "Supabase esta bloqueando INSERT en productos por RLS. Aplica las politicas de INSERT/UPDATE/DELETE del archivo data_base.sql."
        );
      }
      throw error;
    }

    return (data || []).map(normalizeProduct);
  } catch (error) {
    console.error("Error inesperado creando producto:", error);
    throw error;
  }
};

export const getAllProductos = async () => {
  try {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo productos:", error);
      throw error;
    }

    return (data || []).map(normalizeProduct);
  } catch (error) {
    console.error("Error inesperado obteniendo productos:", error);
    throw error;
  }
};
