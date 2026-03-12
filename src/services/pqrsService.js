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

  return { data, error }
}