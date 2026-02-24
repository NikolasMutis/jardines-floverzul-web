import { supabase } from '../config/supabaseClient'

// Registro
export const registerUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  return { data, error }
}

// Login
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { data, error }
}

// Logout
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Usuario actual
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  return { data, error }
}