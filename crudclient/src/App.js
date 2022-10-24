import './App.css';
import AddAnimal from './AddAnimal';
import AnimalsList from './AnimalsList';
import EditAnimal from './EditAnimal';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <nav className="navbar bgnav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src='https://www.bastó.com.ar/images/new/logo-main.png' alt="Logo" className="d-inline-block align-text-top "/>
          </a>
        </div>
      </nav>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AnimalsList/>} exact></Route>
          <Route path='/agregar-animal' element={<AddAnimal/>} exact></Route>
          <Route path='/editar-animal/:idusuario' element={<EditAnimal/>} exact></Route>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
