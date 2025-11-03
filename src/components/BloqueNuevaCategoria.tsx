import { useState } from 'react';
import '../App.css';

interface Producto {
    nombre: string;
    precio: number;
}

export default function BloqueNuevaCategoria(){

    const [productos, setProductos] = useState<Producto[]>([]); // listar productos
    const [nuevoNombre, setNuevoNombre] = useState(""); // Definir nuevos nombres de producto
    const [nuevoPrecio, setNuevoPrecio] = useState(""); // Definir nuevos precios de producto
    const [editandoId, setEditandoId] = useState<number | null>(null); // Seleccionar id para editar
    const [nombreEditado, setNombreEditado] = useState(""); 
    const [precioEditado, setPrecioEditado] = useState("");

    const anadirProducto = () => {
        if(productos.length < 6){

            const nuevoProducto = {
                nombre: nuevoNombre, 
                precio: parseFloat(nuevoPrecio),
            };

            setProductos([...productos, nuevoProducto]);
            setNuevoNombre("");
            setNuevoPrecio("");

        } else {
            alert("máximo de 6 artículos alcanzado");
        }
    }

    const iniciarEdicion = (index: number, producto: Producto) => {
        setEditandoId(index);
        setNombreEditado(producto.nombre);
        setPrecioEditado(producto.precio.toString());
    };

    const guardarEdicion = (index: number) => {
        const ProductosActualizados = productos.map((producto, i) => {
            if(i === index){
                return {
                    nombre: nombreEditado,
                    precio: parseFloat(precioEditado)
                };
            }
            return producto;
        });
        setProductos(ProductosActualizados);
        setEditandoId(null);
        setNombreEditado("");
        setPrecioEditado("");
    };

    const eliminarProducto = (index: number) => {
        const nuevosProductos = productos.filter((_, i: number) => i !== index);
        setProductos(nuevosProductos);
    }

    return(
        <div>
            <div className='listaProductos'>
                {productos.map((producto, index) => (
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
                                <span>{producto.nombre}</span>
                                <span>{producto.precio}€</span>
                                <button
                                    onClick={() => iniciarEdicion(index, producto)}
                                    className='boton-editar'
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarProducto(index)}
                                    className='boton-eliminar'
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                <div className="form-anadir">
                    <input 
                        type="text"
                        placeholder="Nombre del producto..."
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                    <input 
                        type="number"
                        placeholder="Precio del producto..."
                        value={nuevoPrecio}
                        onChange={(e) => setNuevoPrecio(e.target.value)}
                    />
                    <button 
                        className='boton-añadir'
                        onClick = {anadirProducto}>Añadir</button>
                </div>
            </div>
        </div>
    );
}