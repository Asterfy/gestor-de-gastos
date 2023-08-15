import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    //Configurar hooks
    const [descripcion, setDescripcion] = useState("")
    const [fecha, setFecha] = useState("")
    const [monto, setMonto] = useState(0)
    const [gasto, setGasto] = useState(false)

    const navigate = useNavigate()

    const productsCollection = collection(db, "registros")
    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {fecha:fecha, descripcion: descripcion, monto: monto, gasto: gasto})
        navigate('/')
    }
    const miEstilo = {
        color: 'white',
        border: '4px white solid',
        width: "400px",
        padding: "10px",
        paddingTop: "20px"
      };
    return (
        <div className='container' style={miEstilo}>
            <div className='row'>
                <div className='col'>
                    <h1 >Crear registro</h1>
                    <form onSubmit={store} style={{fontSize:"20px"}}>
                        <div className='mb-3' >
                            <label className='form-label' >Fecha</label> <br/>
                            <input
                                style={{width: "240px", border: "2px black solid", borderRadius:"5px"}}
                                value={fecha}
                                onChange={ (e) => setFecha(e.target.value)}
                                type='date'
                                autoFocus
                                // className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Descripción</label> <br/>
                            <input
                                style={{width: "240px", border: "2px black solid", borderRadius:"5px"}}
                                value={descripcion}
                                onChange={ (e) => setDescripcion(e.target.value)}
                                type='text'
                                // className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Monto</label> <br/>
                            <input
                                style={{width: "100px", border: "2px black solid", borderRadius:"5px"}}

                                value={monto}
                                onChange={ (e) => setMonto(e.target.value)}
                                type='number'
                                // className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' style={{paddingRight:"10px"}}>Gasto</label>
                            <input
                                style={{width:"20px", height:"20px", paddingTop:"25px", border: "2px black solid"}}
                                value={gasto}
                                onChange={ (e) => setGasto(!gasto)}
                                type='checkbox'
                                // className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary' style={{fontSize: "20px", backgroundColor:"#167a56"}}>Crear</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Create
