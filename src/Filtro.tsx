import { useMemo, useState } from "react";

function Filtro() {
    const lista = ["Perro","gato","Silla","Mesa","Casa","Juego","Consola","Computadora","Lapicero", "Perro 1","gato 1","Silla 1","Mesa 1","Casa 1","Juego 1","Consola 1","Computadora 1","Lapicero 1",];
    const [busqueda, setBusqueda] = useState("")

    const filtrar = () => {
        return lista.filter((el:string) => el.toLowerCase().includes(busqueda.toLowerCase()))
    }

    const listaFiltrada = useMemo(filtrar,[busqueda])

    return (
        <>
            <main className="">
                <input type="text" placeholder="ingresa una palabra" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)}/>
                {listaFiltrada.map((objeto:string) => (
                    <li className="">
                        {objeto}
                    </li>
                ))}
            </main>
        </>
    );
}

export default Filtro;