import { dbConnect } from "../../../../utils/mongodb"
import Task from "models/Task"

dbConnect()

export const apiTask = async(req, res) => {
  console.log(req.method, req.query)
  const {method, body} = req

  switch (method) {
    case 'GET':
      try {
        const task = await Task.find()
        return res.status(200).json(task)
      } catch (error) {
        return res.status(400).json({error: error.message})
      }

    case 'POST':
      try {
        const newTask = new Task(body)
        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
      } catch (error) {
        return res.status(400).json({error: error.message})
      }

    default:
      return res.status(400).json({mge:'This method is not supported'})
  }
  
}

export default apiTask