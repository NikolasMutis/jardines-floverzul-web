import { supabase } from '../config/supabaseClient'

// Crear PQRS
export const createPQRS = async (pqrsData) => {
  const { data, error } = await supabase
    .from('pqrs')
    .insert([pqrsData])

  return { data, error }
}

// Obtener todas las PQRS
export const getAllPQRS = async () => {
  const { data, error } = await supabase
    .from('pqrs')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

// Cambiar estado
export const updatePQRSStatus = async (id, estado) => {
  const { data, error } = await supabase
    .from('pqrs')
    .update({ estado })
    .eq('id', id)

  return { data, error }
}