import "../App.css"
import datos from '../precios.json';

export default function BloqueTaza(){
    return(
        <div>
            <div className="bebidas">
                <h3>Coffee</h3>
                <img src="./images/coffee.jpg" alt='taza'/>
            </div>    
            <div className="listaBebidas">
                {datos.bebidas.map(listaBebidas => (
                    <div key={listaBebidas.nombre} className="lista">
                        <span>{listaBebidas.nombre}</span>
                        <span>{listaBebidas.precio}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}