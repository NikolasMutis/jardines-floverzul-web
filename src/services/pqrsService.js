import { supabase } from '../config/supabaseClient'

// Crear PQRS
export const createPQRS = async (pqrsData) => {

  if (!pqrsData.titulo || !pqrsData.descripcion) {
    return { error: "Todos los campos son obligatorios" }
  }

  const { data, error } = await supabase
    .from('pqrs')
    .insert([pqrsData])

  return { data, error }
}
// Obtener todas las PQRS
export const getAllPQRS = async () => {

  try {

    const { data, error } = await supabase
      .from('pqrs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data

  } catch (error) {

    console.error("Error obteniendo PQRS:", error)
    return []

  }

}


// Cambiar estado
export const updatePQRSStatus = async (id, estado) => {
  const { data, error } = await supabase
    .from('pqrs')
    .update({ estado })
    .eq('id', id)

  return { data, error }
}

// Eliminar PQRS
export const deletePQRS = async (id) => {
  const { data, error } = await supabase
    .from('pqrs')
    .delete()
    .eq('id', id)

  return { data, error }
}