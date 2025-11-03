import './App.css'
import Header from './components/Header'
import EntradaCategoria from './components/EntradaCategoria'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='contenedor'>
      <img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
      <div className="carta">
        <Header />
        <EntradaCategoria />
        <Footer />
      </div>
    </div>
  )
}