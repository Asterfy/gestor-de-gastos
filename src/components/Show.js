import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from "firebase/firestore"
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
// import withReactContent from "sweetalert2-react-content"

const Show = () => {
    //Configurar hooks
    const [registros, setRegistros] = useState([])
    //Referenciar a la base de datos de firestore
    const registrosCollection = collection(db, "registros")
    //Función para mostrar todos los docs
    const getRegistros = async() => {
        const data = await getDocs(registrosCollection)
        // console.log(data)
        setRegistros(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
        // console.log(registros)
    }
    //Función para eliminar un doc
    const deleteRegistro = async (id) => {
        const registroDoc = doc(db, "registros", id)
        await deleteDoc(registroDoc)
        getRegistros()
    }
    //Función para confirmar con sweet alert 2
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Confirmar',
            text: "¿Está seguro de eliminar el registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteRegistro(id)
                Swal.fire(
                    'Registro borrado!',
                    // 'Your file has been deleted.',
                )
            }
          })
    }
    //Usar use effect
    useEffect(() => {
        getRegistros()
    }, [])
    //Devolver vista del componente
    return (
        <>
        <div className='container' style={{paddingTop:"20px"}}>
            <div className='row'>
                <div className='col'>
                    <div className=' gap-2'>
                        <Link to="/create" className='btn btn-secondary mt-2 mb-2' style={{fontSize:"20px", backgroundColor: "#167a56"}}>Crear <i className="fa-solid fa-plus"></i></Link>
                    </div>
                    <table className='table table-bordered' style={{marginTop: "20px",border: "4px #167a56 solid", borderCollapse: "collapse"}}>
                        <thead>
                            <tr style={{fontSize: "25px"}}>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize: "18px"}}>
                            {registros.map((registro) => (
                                <tr key={registro.id}>
                                    <td>{registro.fecha}</td>
                                    <td>{registro.descripcion}</td>
                                    {
                                        registro.gasto ? <td style={{color: "red"}}>{registro.monto}</td>
                                        :
                                        <td style={{color: "green"}}>{registro.monto}</td>
                                    }
                                    
                                    <td>
                                        <Link to={`/edit/${registro.id}`} className='btn btn-light' style={{fontSize:"15px", marginRight: "10px", backgroundColor: "#167a56"}}><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => {confirmDelete(registro.id)}} className='btn btn-danger' style={{fontSize: "15px"}}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Show
