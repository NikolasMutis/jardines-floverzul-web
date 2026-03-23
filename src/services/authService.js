import { supabase } from '../config/supabaseClient'

const STORAGE_KEY = 'user'

const dispatchStorageSync = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('storage'))
  }
}

const getStoredAuth = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch (error) {
    console.error('Error reading current user from localStorage:', error)
    return null
  }
}

export const registerUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error registering user:', error)
    return null
  }
}

const getProfileRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data?.role ?? data?.rol ?? null
  } catch (error) {
    console.error('Error fetching profile role:', error)
    return null
  }
}

export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    const role = await getProfileRole(data.user.id)
    const authUser = {
      user: data.user,
      role
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))
    dispatchStorageSync()

    return authUser
  } catch (error) {
    console.error('Error logging in:', error)
    return null
  }
}

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error logging out:', error)
  } finally {
    localStorage.removeItem(STORAGE_KEY)
    dispatchStorageSync()
  }
}

export const getCurrentUser = () => getStoredAuth()

export const isAdmin = () => getStoredAuth()?.role === 'admin'

export const isEmpleado = () => getStoredAuth()?.role === 'empleado'

export const loginUser = login

export const logoutUser = logout
