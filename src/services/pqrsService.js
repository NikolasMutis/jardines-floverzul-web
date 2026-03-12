import { supabase } from "../config/supabaseClient";

// Crear PQRS
export const createPQRS = async (pqrsData) => {
  try {
    const { tipo, asunto, descripcion, user_id, estado = "pendiente" } =
      pqrsData || {};

    if (!tipo || !asunto || !descripcion) {
      const error = new Error(
        "Campos obligatorios: tipo, asunto y descripcion",
      );
      return { data: null, error };
    }

    const insertPayload = {
      tipo,
      asunto,
      descripcion,
      estado,
    };

    if (user_id) {
      insertPayload.user_id = user_id;
    }

    const { data, error } = await supabase
      .from("pqrs")
      .insert([insertPayload])
      .select()
      .single();

    return { data, error };
  } catch (error) {
    console.error("Error creando PQRS:", error);
    return { data: null, error };
  }
};

// Obtener todas las PQRS
export const getAllPQRS = async () => {
  try {
    const { data, error } = await supabase
      .from("pqrs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo PQRS:", error.message || error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error inesperado obteniendo PQRS:", error);
    return { data: [], error };
  }
};

// Cambiar estado
export const updatePQRSStatus = async (id, estado) => {
  try {
    if (!id || !estado) {
      const error = new Error("id y estado son obligatorios");
      return { data: null, error };
    }

    const { data, error } = await supabase
      .from("pqrs")
      .update({ estado })
      .eq("id", id);

    return { data, error };
  } catch (error) {
    console.error("Error actualizando estado de PQRS:", error);
    return { data: null, error };
  }
};

// Eliminar PQRS
export const deletePQRS = async (id) => {
  try {
    if (!id) {
      const error = new Error("id es obligatorio");
      return { data: null, error };
    }

    const { data, error } = await supabase.from("pqrs").delete().eq("id", id);

    return { data, error };
  } catch (error) {
    console.error("Error eliminando PQRS:", error);
    return { data: null, error };
  }
};
