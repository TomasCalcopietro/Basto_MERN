import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import uniquid from 'uniqid'
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Alert from './Alert'

const AddAnimal = () => {

  const [idSenasa, setIdSenasa] = useState('')
  const [tipoanimal, setTipoanimal] = useState('')
  const [potrero, setPotrero] = useState('')
  const [dispo, setDispo] = useState('')
  const [numdispo, setNumdispo] = useState('')
  const [alert, setAlert] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    AOS.init()
  }, [])

  const showAlert = alert => {

    setAlert(alert)
    setTimeout(() => {
        setAlert({})
    }, 5000)
}

  function addAnimal() {

    if([idSenasa, tipoanimal, potrero, dispo, numdispo].includes('')) {
      showAlert({
          msg: 'Todos los Campos son Obligatorios',
          error: true
      })
      return
  }

    if(idSenasa.length !== 16) {
      showAlert({
        msg: 'Id Senasa tiene que tener 16 caracteres',
        error: true
    })
    return
    }

    if(numdispo.length !== 8) {
      showAlert({
        msg: 'El Número de dispositivo tiene que tener 8 caracteres',
        error: true
    })
    return
    }

    if(potrero.length > 200) {
      showAlert({
        msg: 'El Nombre de Potrero no puede superar los 200 caracteres',
        error: true
    })
    return
    }

     var animal = {
        idSenasa: idSenasa,
        tipoanimal: tipoanimal,
        potrero: potrero,
        dispo: dispo,
        numdispo: numdispo,
        idanimal: uniquid()
     }
     

     axios.post('/api/animal/addAnimal', animal)
     .then(res => {
      Swal.fire('Felicidades', 'Animal guardado con éxito')
      setTimeout(()=>{
        navigate('/')
      },1500)
     })
     .then(err => {console.log(err)})
  }

  const { msg } = alert

  return (
    <div className='fondo'>
      <div className="App">
        <div className="container title">
          <h2>GESTION DE ANIMALES</h2>
          <a className='btn btn-secondary mt-1' href='/'>← REGRESAR</a>
        </div>
      </div>


      <div className='row'>
        <div className='bform offset-3' data-aos="zoom-in">
          <h2 className='mb-3'>AGREGAR UN NUEVO ANIMAL</h2>
          {msg && <Alert alert={alert}/>}
          <div>
            <label htmlFor='idSenasa' className='form-label titulos'>ID SENASA</label>
            <input
              id='idSenasa'
              type='text' 
              className='form-control textt bgtext' 
              placeholder='Id Senasa'
              value={idSenasa}
              onChange={(e) => {setIdSenasa(e.target.value)}}
            ></input>
          </div>

          <div>
            <label htmlFor='tipoAnimal' className='form-label titulos'>Tipo Animal</label>
            <select
              id='tipoAnimal' 
              type='text' 
              className='form-control textt bgtext' 
              value={tipoanimal}
              onChange={(e) => {setTipoanimal(e.target.value)}}
            >
              <option value="">-- Seleccionar --</option>
              <option>Novillo</option>
              <option>Toro</option>
              <option>Vaquillona</option>
            </select>
          </div>

          <div>
            <label htmlFor='nombrePotrero' className='form-label titulos'>Nombre de potrero</label>
            <input 
              id='nombrePotrero'
              type='text' 
              className='form-control textt bgtext' 
              placeholder='Nombre de potrero'
              value={potrero}
              onChange={(e) => {setPotrero(e.target.value)}}
            ></input>
          </div>

          <div>
            <label htmlFor='dispo' className='form-label titulos'>Tipo de Dispositivo</label>
            <select 
              id='dispo'
              type='text' 
              className='form-control textt bgtext' 
              value={dispo}
              onChange={(e) => {setDispo(e.target.value)}}
            >
              <option value="">-- Seleccionar --</option>
              <option>Collar</option>
              <option>Caravana</option>
            </select>
          </div>

          <div>
            <label htmlFor='numdispo' className='form-label titulos'>Numero de Dispositivo</label>
            <input
              id='numdispo'
              type='text' 
              className='form-control textt bgtext' 
              placeholder='Numero de Dispositivo'
              value={numdispo}
              onChange={(e) => {setNumdispo(e.target.value)}}
            ></input>
          </div>

          <button onClick={addAnimal} className= 'btn btn-success mt-3 form-control textt'>GUARDAR ANIMAL</button>
        </div>
      </div>
    </div>
  )
}

export default AddAnimal
