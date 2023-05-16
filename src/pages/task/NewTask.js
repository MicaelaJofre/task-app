import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const NewTask = () => {

  const [newTask, setNewTask] = useState({title: '', content: ''})
  const [error, setError] = useState({title: '', content: ''})
  const router = useRouter()
  const {query} = useRouter()

  useEffect(() => {
    if(query.id) {
      getTask()
    }
  }, [])
  

  const createTask = async() => {
    try {
      await fetch('http://localhost:3000/api/task', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async() => {
    try {
      await fetch(`http://localhost:3000/api/task/${query.id}`,{
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getTask = async() => {
    try {      
      let res = await fetch(`http://localhost:3000/api/task/${query.id}`)
      let data = await res.json()
      setNewTask({title: data.title, content: data.content})
    } catch (error) {
      console.log(error)
    }
  }


  const handlerSubmit = async(e) =>{
    e.preventDefault()
    if(newTask.title && newTask.content) {
      if(query.id){
        await updateTask()
      }else{
        await createTask()
      }
      setError({ title: "", content: "" })
      setNewTask({ title: "", content: "" })
      router.replace('/')
    }
    !newTask.title ? setError({title: 'Por favor ingresa un título.', content: error.content})  : ''
    !newTask.content ? setError({title: error.title, content: 'Por favor ingresa un contenido.'}) : ''
  }

  const handleChange = (e) =>{  
    const { name, value } = e.target
    setNewTask({
      ...newTask,
      [name]: value
    })

  }

  return (
    <section className="flex min-h-screen justify-center items-center md:p-24 p-6 flex-col">
      <h2 className="text-cyan-600 text-4xl font-bold mb-8 text-center">{query.id ? 'Ya puedes editar tu tarea' : 'Crea una nueva tarea'}</h2>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handlerSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Títutlo
            </label>
            <input 
              onChange={handleChange} 
              name="title" 
              value={newTask.title} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="title" 
              type="text" 
              placeholder="Títutlo"/>
            {
              error.title && <p className="text-red-500 text-xs italic">{error.title}</p>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contenido
            </label>
            <textarea 
              onChange={handleChange} 
              name="content" 
              value={newTask.content} 
              className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="content" 
              type="text" 
              placeholder="Contenido"/>    
            {
              error.content && <p className="text-red-500 text-xs italic">{error.content}</p>
            }        
          </div>
          <div className="flex items-center justify-between">
            <button className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-cyan-100" type="submit">{query.id ? 'Editar' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewTask