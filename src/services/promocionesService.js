import { supabase } from '../config/supabaseClient'

const formatStatusFromDb = (estado = 'activa') => {
  return estado.toLowerCase().includes('inact') ? 'Inactiva' : 'Activa'
}

const formatStatusToDb = (estado = 'Activa') => {
  return estado.toLowerCase().includes('inact') ? 'inactiva' : 'activa'
}

const formatDate = (value) => {
  if (!value) return ''
  return value.split('T')[0]
}

const normalizeDiscount = (value) => {
  const parsedValue = Number(value)
  const discountValue = Number.isNaN(parsedValue) ? 20 : parsedValue
  return `-${discountValue}%`
}

const normalizePromocion = (item, fallback = {}) => {
  const title = item?.titulo ?? fallback?.titulo ?? fallback?.title ?? 'Promocion'
  const desc = item?.descripcion ?? fallback?.descripcion ?? fallback?.desc ?? ''
  const discountValue = item?.descuento ?? fallback?.descuento ?? fallback?.discount ?? 20
  const estado = formatStatusFromDb(item?.estado ?? fallback?.estado ?? fallback?.status ?? 'activa')
  const dateValue = item?.fecha_fin ?? fallback?.fecha_fin ?? fallback?.date ?? item?.fecha_inicio ?? fallback?.fecha_inicio

  return {
    ...item,
    id: item?.id ?? fallback?.id ?? null,
    titulo: title,
    title,
    descripcion: desc,
    desc,
    descuento: normalizeDiscount(discountValue),
    descuentoValor: Number(discountValue) || 20,
    fecha_inicio: item?.fecha_inicio ?? fallback?.fecha_inicio ?? null,
    fecha_fin: item?.fecha_fin ?? fallback?.fecha_fin ?? null,
    date: formatDate(dateValue),
    estado,
    status: estado,
    created_at: item?.created_at ?? item?.fecha_creacion ?? fallback?.created_at ?? null
  }
}

const buildCreatePayload = (data) => ({
  titulo: data.titulo ?? data.title ?? '',
  descripcion: data.descripcion ?? data.desc ?? '',
  descuento: Number(data.descuento ?? data.discount) || 20,
  fecha_inicio: data.fecha_inicio ?? new Date().toISOString(),
  fecha_fin: data.fecha_fin ?? (data.date ? `${data.date}T23:59:59` : null),
  estado: formatStatusToDb(data.estado ?? data.status)
})

const buildUpdatePayload = (data) => {
  const payload = {}

  if (data.titulo !== undefined || data.title !== undefined) {
    payload.titulo = data.titulo ?? data.title ?? ''
  }

  if (data.descripcion !== undefined || data.desc !== undefined) {
    payload.descripcion = data.descripcion ?? data.desc ?? ''
  }

  if (data.descuento !== undefined || data.discount !== undefined) {
    payload.descuento = Number(data.descuento ?? data.discount) || 20
  }

  if (data.fecha_inicio !== undefined) {
    payload.fecha_inicio = data.fecha_inicio
  }

  if (data.fecha_fin !== undefined || data.date !== undefined) {
    payload.fecha_fin = data.fecha_fin ?? (data.date ? `${data.date}T23:59:59` : null)
  }

  if (data.estado !== undefined || data.status !== undefined) {
    payload.estado = formatStatusToDb(data.estado ?? data.status)
  }

  return payload
}

export const getPromociones = async () => {
  try {
    const { data, error } = await supabase
      .from('promociones')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(normalizePromocion)
  } catch (error) {
    console.error('Error fetching promociones:', error)
    return []
  }
}

export const createPromocion = async (data) => {
  try {
    const payload = buildCreatePayload(data)

    const { data: createdPromocion, error } = await supabase
      .from('promociones')
      .insert([payload])
      .select()
      .single()

    if (error) throw error

    return normalizePromocion(createdPromocion, data)
  } catch (error) {
    console.error('Error creating promocion:', error)
    return null
  }
}

export const updatePromocion = async (id, data) => {
  try {
    const payload = buildUpdatePayload(data)

    const { data: updatedPromocion, error } = await supabase
      .from('promociones')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return normalizePromocion(updatedPromocion, data)
  } catch (error) {
    console.error('Error updating promocion:', error)
    return null
  }
}

export const deletePromocion = async (id) => {
  try {
    const { error } = await supabase
      .from('promociones')
      .delete()
      .eq('id', id)

    if (error) throw error

    return true
  } catch (error) {
    console.error('Error deleting promocion:', error)
    return false
  }
}