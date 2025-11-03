import "../App.css"
import datos from '../precios.json';
import { useState } from "react";

interface Producto {
    nombre: string;
    precio: number;
}


export default function BloqueTaza(){

    const [ bebidas, setBebidas ] = useState(datos.bebidas);
    const [ nuevoNombre, setNuevoNombre ] = useState("");
    const [ nuevoPrecio, setNuevoPrecio ] = useState("");
    const [ editandoId, setEditandoId ] = useState<number | null>(null); // Seleccionar id para editar
    const [ nombreEditado, setNombreEditado ] = useState(""); 
    const [ precioEditado, setPrecioEditado ] = useState("");

    const anadirBebida = () => {
        if(bebidas.length < 6){
            if(nuevoNombre.trim() === "" || nuevoPrecio.trim() === ""){
                alert("Debes rellenar todos los campos");
                return
            }
            
            const nuevaBebida = {
                nombre: nuevoNombre,
                precio: parseFloat(nuevoPrecio),
            };

            setBebidas([...bebidas, nuevaBebida]);
            setNuevoNombre("");
            setNuevoPrecio("");

        } else {
            alert("Máximo de 6 bebidas alcanzado");
        }
    };

    const iniciarEdicion = (index: number, bebida: Producto) => {
        setEditandoId(index);
        setNombreEditado(bebida.nombre);
        setPrecioEditado(bebida.precio.toString());
    };

    const guardarEdicion = (index: number) => {
        const ProductosActualizados = bebidas.map((bebida, i) => {
            if(i === index){
                return {
                    nombre: nombreEditado,
                    precio: parseFloat(precioEditado)
                };
            }
            return bebida;
        });
        setBebidas(ProductosActualizados);
        setEditandoId(null);
        setNombreEditado("");
        setPrecioEditado("");
    };

    const eliminarBebida = (index: number) => {
        const nuevasBebidas = bebidas.filter((_, i: number) => i !== index);
        setBebidas(nuevasBebidas);
    }

    return(
        <div>
            <div className="bebidas">
                <img src="./images/coffee.jpg" alt='taza'/>
            </div>    
            <div className="listaBebidas">
                {bebidas.map((bebida, index) => (
                    <div key={index} className='lista'>
                        {editandoId === index ? (
                            <div>
                                <input
                                    type='text'
                                    value={nombreEditado}
                                    onChange={(i) => setNombreEditado(i.target.value)}
                                />
                                <input
                                    type='number'
                                    value={precioEditado}
                                    onChange={(i) => setPrecioEditado(i.target.value)}
                                />
                                <button
                                    onClick={() => guardarEdicion(index)}
                                    className='boton-guardar'
                                >
                                    Guardar
                                </button>
                            </div>
                        ) : (
                            <div>
                                <span>{bebida.nombre}</span>
                                <span>{bebida.precio}€</span>
                                <button
                                    onClick={() => iniciarEdicion(index, bebida)}
                                    className='boton-editar'
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarBebida(index)}
                                    className='boton-eliminar'
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {bebidas.length < 6 && (
                    <div className="form-anadir">
                        <input
                            type="text"
                            placeholder="Nombre de la bebida..."
                            value={nuevoNombre}
                            onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Precio del postre..."
                            value={nuevoPrecio}
                            onChange={(e) => setNuevoPrecio(e.target.value)}
                        />
                        <button 
                            className='boton-añadir'
                            onClick = {anadirBebida}>Añadir</button>
                    </div>
                )}
            </div>
        </div>
    );
}