import { useEffect, useState } from 'react';
import { getProductos, postProductos, putProductos, deleteProductos } from '../../api/api';
import '../App.css';

interface Producto {
    id: number,
    nombre: string;
    precio: number;
}

export default function BloqueNuevaCategoria({categoriaId}: {categoriaId: number}){

    const [productos, setProductos] = useState<Producto[]>([]); // listar productos
    const [nuevoNombre, setNuevoNombre] = useState(""); // Definir nuevos nombres de producto
    const [nuevoPrecio, setNuevoPrecio] = useState(""); // Definir nuevos precios de producto
    const [editandoId, setEditandoId] = useState<number | null>(null); // Seleccionar id para editar
    const [nombreEditado, setNombreEditado] = useState(""); 
    const [precioEditado, setPrecioEditado] = useState("");

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const data = await getProductos(categoriaId);
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        fetchProductos();
    }, [categoriaId]);

    const anadirProducto = async () => {
        if(productos.length < 6){
            try{
                await postProductos(categoriaId, nuevoNombre, parseFloat(nuevoPrecio));
                const actualizados = await getProductos(categoriaId);
                setProductos(actualizados);
                setNuevoNombre("");
                setNuevoPrecio("");
            } catch (error) {
                console.error("Error al crear productos:", error);
            }
        } else {
            alert("máximo de 6 productos alcanzado");
        }
    };

    const iniciarEdicion = (id: number, nombre: string, precio: number) =>{
        setEditandoId(id);
        setNombreEditado(nombre);
        setPrecioEditado(precio.toString());
    }
    const editarProducto = async(id: number, nuevoNombre: string, nuevoPrecio: number) => {
        try{
            await putProductos(id, nuevoNombre, nuevoPrecio);
            setProductos(productos.map(producto => 
                producto.id === id ? {...producto, nombre: nuevoNombre, precio: nuevoPrecio} : producto
            ));
            setEditandoId(null);
            setNombreEditado("");
            setPrecioEditado("");
        } catch (error) {
            console.error("Error al editar Producto:", error);
        }
    };

    const eliminarProducto = async (id: number) => {
        try{
            await deleteProductos(id);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error){
            console.error("Error al eliminar categoría:", error);
        }
    };

    return(
        <div>
            <div className='listaProductos'>
                {productos.map((producto) => (
                    <div key={producto.id} className='lista'>
                        {editandoId === producto.id ? (
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
                                    onClick={() => editarProducto(producto.id, nombreEditado, parseFloat(precioEditado))}
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
                                    onClick={() => iniciarEdicion(producto.id, producto.nombre, producto.precio)}
                                    className='boton-editar'
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarProducto(producto.id)}
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