
import { useEffect } from "react"
import { getAllPQRS } from "../services/pqrsService"

function PQRS() {

  useEffect(() => {

    const prueba = async () => {

      const { data, error } = await getAllPQRS()

      console.log("DATOS PQRS:", data)
      console.log("ERROR:", error)

    }

    prueba()

  }, [])

  return (
    <div>
      <h1>Página PQRS</h1>
    </div>
  )
}

export default PQRS