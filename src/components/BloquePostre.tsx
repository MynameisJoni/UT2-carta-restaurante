import "../App.css"
import datos from '../precios.json';

export default function BloquePostre(){
    return (
        <div>
            <div className='postres'>
                <h3>Dessert</h3>
                <img src="./images/pie.jpg" alt='tarta' />
            </div>
            <div className="listaPostres">
                {datos.postres.map(listapostres => (
                    <div key={listapostres.nombre} className="lista">
                        <span>{listapostres.nombre}</span>
                        <span>{listapostres.precio}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}