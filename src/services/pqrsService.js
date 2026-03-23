import { supabase } from '../config/supabaseClient'

const buildPqrsDescription = ({ nombre = '', correo = '', mensaje = '' }) => [
  `Nombre: ${nombre}`,
  `Correo: ${correo}`,
  'Mensaje:',
  mensaje
].join('\n')

const mapEstadoToDb = (estado = 'Pendiente') => {
  const normalizedEstado = estado.toLowerCase()

  if (normalizedEstado.includes('proceso')) {
    return 'en proceso'
  }

  if (normalizedEstado.includes('resuelta')) {
    return 'resuelta'
  }

  return 'pendiente'
}

const mapEstadoFromDb = (estado = 'pendiente') => {
  const normalizedEstado = estado.toLowerCase()

  if (normalizedEstado.includes('proceso')) {
    return 'En proceso'
  }

  if (normalizedEstado.includes('resuelta')) {
    return 'Resuelta'
  }

  return 'Pendiente'
}

const extractValue = (text, label) => {
  const match = text.match(new RegExp(`${label}:\\s*(.*)`))
  return match?.[1]?.trim() ?? ''
}

const extractMessage = (text = '') => {
  const match = text.match(/Mensaje:\s*([\s\S]*)$/)
  return match?.[1]?.trim() ?? text
}

const normalizePqrs = (item) => {
  const descripcion = item?.descripcion ?? ''

  return {
    ...item,
    nombre: extractValue(descripcion, 'Nombre') || 'Sin nombre',
    correo: extractValue(descripcion, 'Correo'),
    mensaje: extractMessage(descripcion),
    fecha: item?.created_at ? item.created_at.split('T')[0] : '',
    estado: mapEstadoFromDb(item?.estado),
    tipo: item?.tipo ?? '',
    asunto: item?.asunto ?? ''
  }
}

export const getPqrs = async () => {
  try {
    const { data, error } = await supabase
      .from('pqrs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return (data || []).map(normalizePqrs)
  } catch (error) {
    console.error('Error fetching pqrs:', error)
    return []
  }
}

export const createPqrs = async (data) => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
    const payload = {
      user_id: currentUser?.user?.id ?? data.user_id ?? null,
      tipo: data.tipo,
      asunto: data.asunto || `${data.tipo} - ${data.nombre}`,
      descripcion: buildPqrsDescription(data),
      estado: mapEstadoToDb(data.estado)
    }

    const { data: createdPqrs, error } = await supabase
      .from('pqrs')
      .insert([payload])
      .select()
      .single()

    if (error) {
      throw error
    }

    return normalizePqrs(createdPqrs)
  } catch (error) {
    console.error('Error creating pqrs:', error)
    return null
  }
}

export const updatePqrsStatus = async (id, estado) => {
  try {
    const { data, error } = await supabase
      .from('pqrs')
      .update({ estado: mapEstadoToDb(estado) })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return normalizePqrs(data)
  } catch (error) {
    console.error('Error updating pqrs status:', error)
    return null
  }
}

export const deletePqrs = async (id) => {
  try {
    const { error } = await supabase
      .from('pqrs')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting pqrs:', error)
    return false
  }
}

export const createPQRS = createPqrs

export const getAllPQRS = getPqrs

export const updatePQRSStatus = updatePqrsStatus
