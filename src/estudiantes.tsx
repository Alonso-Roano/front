import axios from "axios";
import { useCallback, useEffect, useState } from "react";


interface peticion {
    nombre: string,
    edad: number,
    correo: string
}

const initialState:peticion = {nombre:'',edad:0,correo:''};

function Estudiantes() {

    const [body,setBody] = useState<peticion>(initialState);
    const [alumnos,setAlumnos] = useState([])

    const getAlumnos = async () => {
        const response = await axios.get('https://localhost:7183/api/estudiantes/get');
        console.log(response)
        setAlumnos(response.data.result);
    }
    useEffect(() =>{
        getAlumnos();
    },[])

    const enviar = useCallback(async()=>{
        if (body.nombre.trim() && body.edad !== 0 && body.correo.trim()) {
            const response2 = await axios.post('https://localhost:7183/api/estudiantes/create',body)
            console.log(response2.data)
            getAlumnos();
            setBody(initialState)
        } else {
            console.log("Llene el formulario")
        }
    },[body]);

    return (
        <>
            <main className="estudiantes">
                <div className="formulario">
                    <article>
                        <input type="text" placeholder="Ingrese el nombre del alumno" value={body.nombre} onChange={(e)=>setBody({...body, nombre:e.target.value})}/>
                        <input type="text" placeholder="Ingrese la edad del alumno" value={body.edad} onChange={(e)=>setBody({...body, edad:Number(e.target.value)})} onKeyDown={(e) => {if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Tab") {e.preventDefault(); console.log(e.key)}}}/>
                        <input type="email" placeholder="Ingrese el correo del alumno" value={body.correo} onChange={(e)=>setBody({...body, correo:e.target.value})}/>
                        <button onClick={enviar}>Ingresar alumno</button>
                    </article>
                </div>
                <aside className="lista">
                    {alumnos.map((alumno:peticion,index:number)=>
                        <>
                            <span className="alumno" key={index}>
                                <img src="" alt="" />
                                <p>{alumno.nombre}</p>
                                <p>{alumno.edad} años</p>
                                <p>{alumno.correo}</p>
                            </span>
                        </>
                    )}
                </aside>
            </main>
        </>
    );
}

export default Estudiantes;