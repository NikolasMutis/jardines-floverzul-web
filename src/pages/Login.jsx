// PRUEBA DE LOGIN NO TERMINADA 
import { useState } from "react"
import { loginUser } from "../services/authService"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await loginUser(email, password)

    if (error) {
      alert(error.message)
    } else {
      alert("Login exitoso")
      console.log(data)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login