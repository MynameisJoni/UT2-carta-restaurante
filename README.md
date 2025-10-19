# UT2 - Creación de una carta de un restaurante con React
## Índice
- [App](#app)
  - [Imágenes](#imagenes)
- [Componentes](#componentes)
  - [Header](#header)
  - [BloqueTaza y BloquePostre](#bloquetaza-y-bloquepostre)
  - [Footer](#footer)
- [Resultado final de App.tsx](#resultado-final-de-apptsx)

En este proyecto se ha dividido la estructura de la cacrta en 5 ficheros principales:
<ul>
  <li>App</li>
  <li>Header</li>
  <li>Footer</li>
  <li>BloqueTaza</li>
  <li>BloquePostre</li>
</ul>

Para el estilo de la carta se ha utilizado un solo fichero css.

A continuación definiremos cada uno de ellos.

## App
Componente principal. En el se definió la imagen de fondo de la carta y el contenedor principal. En este último emplearemos los componentes creados.
Su composición será la siguiente:
```javascript
export default function App() {
  return (
    <div className='contenedor'>
      <img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
      <div className="carta">
        <!-- Componentes -->
      </div>
    </div>
  )
}
```
Se encuentra el *contenedor* principal. Dentro se establece la imagen principal *(fondo)* y la clase *carta*. Como se dijo anteriormente, esta última va a ser la más importante, ya que dentro de ella irán el resto de componentes.

El estilo utilizado es el siguiente (en el mismo encontramos la explicación de las propiedades más relevantes):
```css
.contenedor{
  position: relative; /* Posicionar el contenedor para los elementos hijos */
  width: 30%;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  overflow: hidden; /* Elimina todo lo que sobresalga del contenedor */
}
.carta{
  position: absolute; /* Se posiciona respecto al contenedor */ 
  top: 5%; /* Separación superior */
  width: 80%;
  height: 90%;
  margin-left: 10%;
  background-color: rgb(217, 175, 124);
}
```
### Imágenes
Mención especial a la carpeta *images* situada en la raiz del proyecto. Aquí irán todas las imagenes utilizadas en el proyecto. Como por ejemplo la imagen de fondo:
```javascript
<img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
```

## Componentes
Dentro de **src** se crea la carpeta para almacenar los componentes que componen la app.

La estructura básica de cada componente será la siguiente:

```javascript
import "../App.css";

export default function NombreDelComponente(){
    return (
      /* Composición del componente */
    );
}
```
En las explicaciones de los componentes solo se mostrará lo que en el bloque anterior se definió como *Composición del componente*.

El *NombreDelComponente* será el título de cada apartado.

### Header
Cabecera de la carta. Componente sencillo en donde se definen el título de la carta y una breve descripción:
```javascript
import "../App.css";
/* ... */
<div className="bloqueHeader">
    <h1>CAMPER CAFE</h1>
    <p>Est. 2020</p>
    <hr />
</div>
```
Primero que nada, se importa el estilo de *App.css*.

Encapsulamos todo el componente en una clase *bloqueHeader*. Dentro se encontrarán las etiquetas:
-  **h1**: título principal de la carta
- **p**: descripción
- **hr**: una linea para separar

Los estilos utilizados:
```css
.bloqueHeader{
  text-align: center;
  color: black;
}
.bloqueHeader h1{
  font-size: 50px;
  font-weight: bold;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 5; 
}
```
Como propiedades más relevantes se encuentran *text-align* para centrar todo el texto del Header y *margin* espécifico para **h1** para separar el título principal del margen superior del *contenedor*

### BloqueTaza y BloquePostre
Se encuentra el contenido principal de la carta. Se va explicar ambos componentes en el mismo apartado ya que comparten prácticamente la misma estructura. 

En un primer lugar, como siempre, se importa el estilo de *App.css*, pero lo más importante es importar el contenido de la carta del fichero *precios.json*:
```json
{
    "bebidas": [
        {
            "nombre": "French Vanilla",
            "precio": 1.50
        },
        /* resto de propiedades...*/
    ],
    /* ...incluido los postres */
 }
```
En este fichero se van a definir todos los componentes de la carta. En el caso del ejercicio solo encontramos *bebidas* y *postres*. Dentro de cada uno se especifican el *nombre* del producto y el *precio* del mismo.

En este componente se va a encapsular todo el contenido dentro de un **div** principal. En primer lugar se encuentra el título del bloque y la imágen de forma silimar a las vistas anteriormente:
```javascript
<div className="bebidas">
    <h3>Coffee</h3>
    <img src="./images/coffee.jpg" alt='taza'/>
</div>   
```
Antes se habló del array del *json*, esto es importante porque ahora se empleará un **map** para acceder a cada elemento del array, pero antes, definimos el array de la siguiente manera:
```javascript 
import datos from '../precios.json'; /* el array nombrado anteriormente */
/* ...resto de código...*/
    {datos.bebidas.map(bebidas => (
```
De aquí la parte importante es que se define el nombre del *json* como *datos* y luego accedemos **solo** a las *bebidas* (de ahí el *datos.bebidas*). Seguidamente se emplea un **map** para recorrer el array (un *map* es similar al conocido y temido *for*). En el ejercicio se emplea así:
```javascript
{datos.bebidas.map(listaBebidas => ()
```
Primero se tiene el array, se recorre con un *map* y seguidamente se define un nombre de variable *listaBebidas* (*listaPostres* para el componente de los postres). Luego se define una **key** para que react pueda identificar cada elemento:
```javascript
<div key={listaBebidas.nombre} className="lista">
```
Y por último accedemos a cada elemento de *bebidas* dentro del *json*:
```javascript
<span>{listaBebidas.nombre}</span>
<span>{listaBebidas.precio}</span>
```
De esta forma accedemos al *nombre* y al *precio* de *bebidas* dentro del *json*. El bloque completo quedaría de la siguiente manera:
```javascript
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
```
En resumidas cuentas:
- Se importan estilos y json (array *datos*)
- Se define un *'header'* para este bloque
- Se llama al array y se recorre el mismo con un *map*

Como resultado se tiene una lista con los productos y precios definidos dentro del *json*

Los estilos utilizados son los siguientes:
```css
.bebidas{
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column; /* Los elementos se colocan uno debajo del otro... */
  align-items: center; /* ... y centrados */
}
.bebidas h3{
  font-size: 40px;
  font-weight: bold;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 0; /* Elimina el margen predeterminado de la etiqueta h3 */
}
.listaBebidas{
  color: black;
  padding: 20px;
  font-size: 20px;
}
.lista{
  width: 100%;
  display: flex;
  justify-content: space-between; /* Separamos los elementos dentro del bloque */
}
```
*Este ejemplo es para las bebidas, pero se ha empleado el mismo código para los postres*

### Footer
Este componente es similar al header:
- Se define un separador
- En lugar de un título se establece un enlace (en este caso para algo útil como la documentación react)
- Por último, una breve descripción

```javascript
<div className="footer">
    <hr />
    <a href="https://react.dev">
    Mas cositas de React
    </a>
    <p>Primer proyecto React</p>
</div>
```
*Como siempre, nunca olvidar importar los estilos:*
```css
.footer{
  text-align: center;
  color:black;
}
.footer a{
  color:black;
  text-decoration: underline;
}
hr {
  color: #650101;
  margin-left: 15px;
  margin-right: 15px;
  border: none;
  border-top: 5px solid;
}
```
## Resultado final de App.tsx
Una vez definidos los **componentes**, el resultado del fichero principal se debería ver de la siguiente manera:
```javascript
import './App.css'
import Header from './components/Header'
import BloqueTaza from './components/BloqueTaza'
import BloquePostre from './components/BloquePostre'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='contenedor'>
      <img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
      <div className="carta">
        <Header />
        <BloqueTaza />  
        <BloquePostre />
        <Footer />
      </div>
    </div>
  )
}
```
Los estilos y contenedores principales se explicaron anteriormente, pero ahora se encuentran los cuatro componentes explicados anteriormente. 