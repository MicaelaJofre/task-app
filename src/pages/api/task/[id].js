import Task from "models/Task"
import { dbConnect } from "../../../../utils/mongodb"

dbConnect()

const idRouter = async(req, res) => {

  const {body, method, query:{id}} = req

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(id)
        if(!task) return res.status(404).json({mge:'Task not found'})
        return res.status(200).json(task)
      } catch (error) {
        return res.status(400).json({error: error.message})
      }

      case 'PUT':
        try {
          const updateTask = await Task.findByIdAndUpdate(id, body, {new: true})
          if(!updateTask) return res.status(404).json({mge:'Task not found'})
          return res.status(200).json(updateTask)
        } catch (error) {
          return res.status(400).json({error: error.message})
        }

      case 'DELETE':  
        try {
          const deleteTask = await Task.findByIdAndDelete(id)
          if(!deleteTask) return res.status(404).json({mge:'Task not found'})
          return res.status(204).json(deleteTask)
        } catch (error) {
          return res.status(400).json({error: error.message})
        }
    default:
      return res.status(400).json({mge:'This method is not supported'})
  }
}

export default idRouter