import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2';

const AnimalsList = () => {

  const [dataAnimales, setDataAnimales] = useState([])

  useEffect(() => {
    axios.get('api/animal/getanimals').then(res => {
    setDataAnimales(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    AOS.init()
  }, [])


  // Function to delete Animal
  function deleteanimal(idanimal) {
    axios.post('/api/animal/deleteanimals', {idanimal: idanimal}).then(res => {
      Swal.fire('Felicidades', 'Animal eliminado con éxito')
      setTimeout(()=>{
        navigate(0)
      }, 2000)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className="App">
        <div className="container title">
          <h2>GESTION DE ANIMALES</h2>
          <a className='btn btn-success Nuev mt-2' href='/agregar-animal'>NUEVO ANIMAL</a>
        </div>
      </div>
      <div>
        <div>
          <table className="table tabla" data-aos="flip-right">
            <thead>
              <tr className='titulos2'>
                <th>Id Senasa</th>
                <th>Tipo Animal</th>
                <th>Nombre Potrero</th>
                <th>Tipo Dispositivo</th>
                <th>Numero de Dispositivo</th>
                <th colSpan={3}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAnimales.map((animal) => (
                <tr>
                  <td>{animal.idSenasa}</td>
                  <td>{animal.tipoAnimal}</td>
                  <td>{animal.nombrePotrero}</td>
                  <td>{animal.tipoDispositivo}</td>
                  <td>{animal.numeroDispositivo}</td>
                  <td><Link to={`/editar-animal/${animal.idanimal}`} className='btn btn-success mt-2'>Editar</Link></td>
                  <td><button className='btn btn-danger mt-2' onClick={() => {deleteanimal(animal.idanimal)}}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnimalsList
