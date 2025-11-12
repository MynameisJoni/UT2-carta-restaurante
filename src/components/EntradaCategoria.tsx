import { useEffect, useState } from 'react';
import { getCategorias, postCategorias, putCategoria, deleteCategoria } from '../../api/api';
import BloqueNuevaCategoria from './BloqueNuevaCategoria';
import '../App.css';

interface Categoria{
    id: number;
    nombre: string;
    tipo: 'bebidas' | 'postre' | 'nueva';
}

export default function EntradaCategoria(){

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nombreEditado, setNombreEditado] = useState("");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar las categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    const agregarCategoria =  async () => {
        try{
            const response = await postCategorias(nuevaCategoria);

            const nueva = {
                id: response.id,
                nombre: nuevaCategoria,
                tipo: 'nueva' as const
            };

            setCategorias([...categorias, nueva]);
            setNuevaCategoria("");
        } catch (error){
            console.error("Error al crear categoria:", error);
        }
    };

    const iniciarEdicion = (id: number, nombre: string) =>{
        setEditandoId(id);
        setNombreEditado(nombre);
    }
    const editarCategoria = async(id: number, nuevoNombre: string) => {
        try{
            await putCategoria(id, nuevoNombre);
            setCategorias(categorias.map(categoria => 
                categoria.id === id ? {...categoria, nombre: nuevoNombre} : categoria
            ));
            setEditandoId(null);
            setNombreEditado("");
        } catch (error) {
            console.error("Error al editar categoría:", error);
        }
    };

    const eliminarCategoria = async (id: number) => {
        try{
            await deleteCategoria(id);
            setCategorias(categorias.filter(categoria => categoria.id !== id));
        } catch (error){
            console.error("Error al eliminar categoría:", error);
        }
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

                    {(<BloqueNuevaCategoria categoriaId={categoria.id}/>)}

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