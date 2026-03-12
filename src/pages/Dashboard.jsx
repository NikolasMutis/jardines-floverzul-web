import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function Dashboard(){

/* ESTADOS */

const [tab,setTab] = useState("plantas")

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [desc,setDesc] = useState("")
const [cientifico,setCientifico] = useState("")
const [image,setImage] = useState(null)

const [plants,setPlants] = useState([])


/* CARGAR PLANTAS */

useEffect(()=>{

const storedPlants = JSON.parse(localStorage.getItem("plants")) || []

setPlants(storedPlants)

},[])


/* AGREGAR PLANTA */

const addPlant = () => {

if(name === "" || price === ""){
alert("Completa los campos")
return
}

const imageURL = image ? URL.createObjectURL(image) : null

const newPlant = {

name,
price,
descripcion:desc,
cientifico:cientifico,
image:imageURL

}

const updatedPlants = [...plants,newPlant]

setPlants(updatedPlants)

localStorage.setItem("plants",JSON.stringify(updatedPlants))

setName("")
setPrice("")
setDesc("")
setCientifico("")
setImage(null)

}


/* ELIMINAR PLANTA */

const deletePlant = (index) => {

const updatedPlants = [...plants]

updatedPlants.splice(index,1)

setPlants(updatedPlants)

localStorage.setItem("plants", JSON.stringify(updatedPlants))

}


/* RENDER */

return(

<>

<Navbar/>

<section className="dashboard">

<h1 className="dash-title">Panel Administrativo</h1>

<p className="dash-subtitle">
Gestión completa del sistema
</p>


{/* TARJETAS */}

<div className="dash-cards">

<div className="dash-card">
<h3>Plantas registradas</h3>
<p>{plants.length}</p>
</div>

<div className="dash-card">
<h3>Promociones activas</h3>
<p>3</p>
</div>

<div className="dash-card">
<h3>PQRS recibidos</h3>
<p>12</p>
</div>

<div className="dash-card">
<h3>Usuarios registrados</h3>
<p>5</p>
</div>

</div>


{/* BARRA DE PESTAÑAS */}

<div className="dash-tabs">

<button onClick={()=>setTab("plantas")}>
Plantas
</button>

<button onClick={()=>setTab("promociones")}>
Promociones
</button>

<button onClick={()=>setTab("pqrs")}>
PQRS
</button>

<button onClick={()=>setTab("usuarios")}>
Usuarios
</button>

</div>



{/* SECCIÓN DINÁMICA */}

<div className="dash-content">


{/* PLANTAS */}

{tab === "plantas" && (

<>

<div className="plant-form">

<h2>Agregar planta</h2>

<input
placeholder="Nombre de la planta"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Nombre científico"
value={cientifico}
onChange={(e)=>setCientifico(e.target.value)}
/>

<input
placeholder="Precio"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<textarea
placeholder="Descripción"
value={desc}
onChange={(e)=>setDesc(e.target.value)}
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button onClick={addPlant}>
Guardar planta
</button>

</div>


<h2 className="plant-list-title">Plantas registradas</h2>

<div className="plant-list">

{plants.map((plant,index)=>(

<div className="plant-item" key={index}>

{plant.image && (
<img src={plant.image} alt={plant.name}/>
)}

<div className="plant-info">

<h4>{plant.name}</h4>

<p>{plant.cientifico}</p>

<p>${plant.price}</p>

</div>

<button
className="delete-btn"
onClick={()=>deletePlant(index)}
>
Eliminar
</button>

</div>

))}

</div>

</>

)}



{/* PROMOCIONES */}

{tab === "promociones" && (

<div>

<h2>Gestión de promociones</h2>

<p>Aquí podrás crear o editar promociones.</p>

</div>

)}



{/* PQRS */}

{tab === "pqrs" && (

<div>

<h2>PQRS recibidos</h2>

<p>Aquí se mostrarán las peticiones, quejas y sugerencias.</p>

</div>

)}



{/* USUARIOS */}

{tab === "usuarios" && (

<div>

<h2>Usuarios registrados</h2>

<p>Aquí podrás ver los usuarios que han ingresado a la plataforma.</p>

</div>

)}

</div>

</section>

</>

)

}

export default Dashboard