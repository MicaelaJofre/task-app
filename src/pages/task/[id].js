import { useRouter } from "next/router"
import Error from 'next/error'
import React, { useState } from 'react'

const TaskDetail = ({task, error}) => {
  const [modal, setModal] = useState(false)
  const router = useRouter()
  
  if(error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusMsg}/>

  const handleModal = () =>{
    setModal(!modal)
  }
  
  const handleDelete = async() =>{
    try {
      await fetch(`http://localhost:3000/api/task/${task._id}`, {
      method: 'DELETE'
    })
    router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex min-h-screen justify-center items-baseline p-24 relative'>
      <div key={task._id} className="max-w-sm w-[250px] h-auto rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{task.title}</div>
              <p className="text-gray-700 text-base">{task.content}</p>
          </div>
          <div className="px-6 pt-4 pb-2">                
            <button className="inline-block cursor-pointer bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={handleModal}>Eliminar</button>
          </div>
      </div>
      {
        modal 
        ? <div className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <span className="sr-only">Cerrar</span>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Estas seguro de querer borrar esta tarea?</h3>
                        <button onClick={handleDelete} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            ¿Estas seguro?
                        </button>
                        <button onClick={handleModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        : null
      }    
    </section>
  )
}

export const getServerSideProps = async({query: {id}}) =>{
  const res = await fetch (`http://localhost:3000/api/task/${id}`)
  if(res.status === 200){
    const task = await res.json(res)
    return{
      props: {task}
    }
  }else{
    return{
      props: {
        error: {
          statusCode: res.status,
          statusMsg: 'Tarea no encontrada'
        }
      }
    }
  }

}

export default TaskDetail