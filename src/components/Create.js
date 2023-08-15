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
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Crear registro</h1>
                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Fecha</label>
                            <input
                                value={fecha}
                                onChange={ (e) => setFecha(e.target.value)}
                                type='date'
                                // className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Descripción</label>
                            <input
                                value={descripcion}
                                onChange={ (e) => setDescripcion(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Monto</label>
                            <input
                                value={monto}
                                onChange={ (e) => setMonto(e.target.value)}
                                type='number'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Gasto</label>
                            <input
                                value={gasto}
                                onChange={ (e) => setGasto(!gasto)}
                                type='checkbox'
                                // className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Crear</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Create
