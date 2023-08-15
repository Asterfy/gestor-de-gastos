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
                    <h1 >Editar registro</h1>
                    <form onSubmit={update} style={{fontSize:"20px"}}>
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
                            {
                                gasto ? <input
                                style={{width:"20px", height:"20px", paddingTop:"25px", border: "2px black solid"}}
                                value={gasto}
                                onChange={ (e) => setGasto(!gasto)}
                                type='checkbox'
                                checked
                                // className='form-control'
                            /> :
                            <input
                                style={{width:"20px", height:"20px", paddingTop:"25px", border: "2px black solid"}}
                                value={gasto}
                                onChange={ (e) => setGasto(!gasto)}
                                type='checkbox'
                                // className='form-control'
                            />
                            }
                            
                        </div>
                        <button type='submit' className='btn btn-primary' style={{fontSize: "20px", backgroundColor:"#167a56"}}>Actualizar</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Edit