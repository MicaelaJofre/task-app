import { useRouter } from "next/router"
import Error from 'next/error'
import React, { useState } from 'react'
import Image from "next/image"
import query from '../../../../public/img/query.jpg'

const TaskDetail = ({task, error}) => {
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  
  if(error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusMsg}/>

  const handleModal = () =>{
    setModal(!modal)
  }
  
  const handleDelete = async() =>{
    setLoader(true)
    try {
      await fetch(`http://localhost:3000/api/task/${task._id}`, {
      method: 'DELETE'
    })
    router.replace('/')
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <section className='flex min-h-screen justify-center items-center md:p-24 p-6'>
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
        ? <div className="fixed top-auto left-auto right-auto z-50 p-4">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <Image className="m-auto" alt={'query'} width={120} height={120} src={query} />
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <span className="sr-only">Cerrar</span>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">¿Estas seguro de querer borrar esta tarea?</h3>
                        <button onClick={handleDelete} type="button" className="text-gray-700 bg-red-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:bg-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            {
                              loader 
                              ? <div role="status">
                                  <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                </div>
                              : '¿Estas seguro?'
                            }
                        </button>
                        <button onClick={handleModal} type="button" className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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