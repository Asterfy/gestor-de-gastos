import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { toBeChecked } from "@testing-library/jest-dom/matchers"

const Edit = () => {

    const [ descripcion, setDescripcion ] = useState('')
    const [ monto, setMonto ] = useState(0)
    const [gasto, setGasto] = useState(false)
    const [fecha, setFecha] = useState("")

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const registro = doc(db, "registros", id)
        const data = {description: descripcion, monto: monto, gasto:gasto, fecha:fecha}
        await updateDoc(registro, data)
        navigate('/')
    }

    const getregistroById = async (id) => {
        const registro = await getDoc( doc(db, "registros", id) )
        if(registro.exists()) {
            //console.log(registro.data())
            setFecha(registro.data().fecha)
            setDescripcion(registro.data().descripcion)    
            setMonto(registro.data().monto)
            setGasto(registro.data().gasto)
        }else{
            console.log('El registro no existe')
        }
    }

    useEffect( () => {
        getregistroById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar registro</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Fecha</label>
                        <input
                            value={fecha}
                            onChange={ (e) => setFecha(e.target.value)} 
                            type="date"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input
                            value={descripcion}
                            onChange={ (e) => setDescripcion(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Monto</label>
                        <input
                            value={monto}
                            onChange={ (e)=> setMonto(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Gasto</label>
                        {gasto ? <input
                            value={gasto}
                            onChange={ (e)=> setGasto(!gasto)} 
                            type="checkbox"
                            checked
                        />:
                        <input
                        value={gasto}
                        onChange={ (e)=> setGasto(!gasto)} 
                        type="checkbox"
                        />  
                        }                
                    </div>
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit