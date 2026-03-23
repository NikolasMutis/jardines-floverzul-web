import { supabase } from '../config/supabaseClient'
import { uploadImage } from './storageService'

const parsePrice = (value) => {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  const parsedValue = Number(normalizedValue)
  return Number.isNaN(parsedValue) ? null : parsedValue
}

const formatPrice = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return ''
  }

  return `$${Number(value).toLocaleString('es-CO')}`
}

const normalizePlanta = (item, fallback = {}) => {
  const nombre = item?.nombre ?? fallback?.nombre ?? fallback?.name ?? 'Producto sin nombre'
  const precioNumero = parsePrice(item?.precio ?? fallback?.precio ?? fallback?.price)
  const imagen = item?.imagen ?? fallback?.imagen ?? fallback?.image ?? null
  const tipo = fallback?.tipo ?? fallback?.categoria ?? item?.tipo ?? 'General'
  const estado = fallback?.estado ?? item?.estado ?? 'Disponible'
  const cientifico = fallback?.cientifico ?? item?.cientifico ?? ''

  return {
    ...item,
    id: item?.id ?? fallback?.id ?? null,
    nombre,
    name: nombre,
    descripcion: item?.descripcion ?? fallback?.descripcion ?? '',
    precio: formatPrice(precioNumero),
    precioNumero,
    price: precioNumero,
    imagen,
    image: imagen,
    tipo,
    categoria: tipo,
    estado,
    cientifico,
    created_at: item?.created_at ?? fallback?.created_at ?? null
  }
}

const buildCreatePayload = async (data) => {
  let imageUrl = data.imagen ?? data.image ?? null

  if (data.imagenFile || data.imageFile) {
    imageUrl = await uploadImage(data.imagenFile || data.imageFile, 'productos')
  }

  return {
    nombre: data.nombre ?? data.name ?? '',
    descripcion: data.descripcion ?? '',
    precio: parsePrice(data.precio ?? data.price),
    imagen: imageUrl
  }
}

const buildUpdatePayload = async (data) => {
  const payload = {}

  if (data.nombre !== undefined || data.name !== undefined) {
    payload.nombre = data.nombre ?? data.name ?? ''
  }

  if (data.descripcion !== undefined) {
    payload.descripcion = data.descripcion ?? ''
  }

  if (data.precio !== undefined || data.price !== undefined) {
    payload.precio = parsePrice(data.precio ?? data.price)
  }

  if (data.imagenFile || data.imageFile) {
    payload.imagen = await uploadImage(data.imagenFile || data.imageFile, 'productos')
  } else if (data.imagen !== undefined || data.image !== undefined) {
    payload.imagen = data.imagen ?? data.image ?? null
  }

  return payload
}

export const getPlantas = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return (data || []).map((item) => normalizePlanta(item))
  } catch (error) {
    console.error('Error fetching plantas:', error)
    return []
  }
}

export const createPlanta = async (data) => {
  try {
    const payload = await buildCreatePayload(data)
    const { data: createdPlanta, error } = await supabase
      .from('productos')
      .insert([payload])
      .select()
      .single()

    if (error) {
      throw error
    }

    return normalizePlanta(createdPlanta, data)
  } catch (error) {
    console.error('Error creating planta:', error)
    return null
  }
}

export const updatePlanta = async (id, data) => {
  try {
    const payload = await buildUpdatePayload(data)
    const { data: updatedPlanta, error } = await supabase
      .from('productos')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return normalizePlanta(updatedPlanta, data)
  } catch (error) {
    console.error('Error updating planta:', error)
    return null
  }
}

export const deletePlanta = async (id) => {
  try {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting planta:', error)
    return false
  }
}
