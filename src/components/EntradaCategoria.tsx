import { useState } from 'react';
import BloqueTaza from './BloqueTaza';
import BloquePostre from './BloquePostre';
import BloqueNuevaCategoria from './BloqueNuevaCategoria';
import '../App.css';

interface Categoria{
    id: number;
    nombre: string;
    tipo: 'bebidas' | 'postre' | 'nueva';
}

export default function EntradaCategoria(){

    const [categorias, setCategorias] = useState<Categoria[]>([
        {
            id: 1, 
            nombre: "Bebidas",
            tipo: 'bebidas'
        },
        {
            id: 2,
            nombre: "Postres",
            tipo: 'postre'
        }
    ]);

    const [nuevaCategoria, setNuevaCategoria] = useState<string>("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nombreEditado, setNombreEditado] = useState<string>("");

    const agregarCategoria = () => {
        const nueva: Categoria ={
            id: categorias.length + 1,
            nombre: nuevaCategoria,
            tipo: 'nueva'
        };

        setCategorias([...categorias, nueva]);
        setNuevaCategoria("");
    };

    const iniciarEdicion = (id: number, nombre: string) => {
        setEditandoId(id);
        setNombreEditado(nombre);
    }

    const editarCategoria = (id: number, nuevoNombre: string) => {
        setCategorias(categorias.map(categoria => 
            categoria.id === id ? {...categoria, nombre: nuevoNombre} : categoria
        ));
        setEditandoId(null);
        setNombreEditado("");
    }

    const eliminarCategoria = (id: number) => {
        setCategorias(categorias.filter(categoria => categoria.id !== id));
    };

    return (
        <div>
            <div className="añadirCategoria">
                <input
                    type="text"
                    value = {nuevaCategoria}
                    onChange={(i) => setNuevaCategoria(i.target.value)}
                    placeholder='Añadir nueva categoría...' />
                <button 
                    className='boton-añadir'
                    onClick={agregarCategoria}>Añadir Categoría</button>
            </div>

            {categorias.map((categoria) => (
                <div key={categoria.id} className='bloqueCategoria'>
                    {editandoId === categoria.id ? (
                        <div className='editarCategoria'>
                            <input
                                type='text'
                                value={nombreEditado}
                                onChange={(i) => setNombreEditado(i.target.value)}/>
                            <button 
                                onClick={() => editarCategoria(categoria.id, nombreEditado)}
                                className='boton-guardar'>
                                Guardar
                            </button>
                        </div>
                    ) : (
                        <h3>{categoria.nombre}</h3>
                    )}

                    {categoria.tipo === 'bebidas' ? (<BloqueTaza />) 
                    : categoria.tipo === 'postre' ? (<BloquePostre />)
                    : (<BloqueNuevaCategoria />)}

                    <div className='botones-categoria'>
                        <button
                            onClick={() => iniciarEdicion(categoria.id, categoria.nombre)}
                            className='boton-editar'>
                            Editar Categoria
                        </button>
                        <button
                            onClick={() => eliminarCategoria(categoria.id)}
                            className="boton-eliminar">
                            Eliminar Categoría - {categoria.nombre}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}