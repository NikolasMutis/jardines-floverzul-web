import { supabase } from '../config/supabaseClient'

// Obtener todas las promociones
export const getPromociones = async () => {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener promociones:', error.message)
      return { data: null, error }
    }

    return { data, error: null }

  } catch (err) {
    console.error('Error inesperado:', err)
    return { data: null, error: err }
  }
}


// Obtener una promoción por ID
export const getPromocionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error al obtener promoción:', error.message)
      return { data: null, error }
    }

    return { data, error: null }

  } catch (err) {
    console.error('Error inesperado:', err)
    return { data: null, error: err }
  }
}