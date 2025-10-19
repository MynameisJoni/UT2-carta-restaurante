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

