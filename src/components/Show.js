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
            title: 'Remover el registroo?',
            text: "Está seguro de eliminar el registroo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteRegistro(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
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
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-grid gap-2'>
                        <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                    </div>
                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros.map((registro) => (
                                <tr key={registro.id}>
                                    <td>{registro.fecha}</td>
                                    <td>{registro.descripcion}</td>
                                    <td>{registro.monto}</td>
                                    <td>
                                        <Link to={`/edit/${registro.id}`} className='btn btn-light'><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => {confirmDelete(registro.id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
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
