import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true, 
    maxlength: [40, 'Title must be less than 40 characteres']
  },
  content: {
    type: String,
    require: true,
    unique: true,
    trim: true, 
    maxlength: [200, 'Description must be less than 200 characteres']
  }
},{ 
  timestamps: true, //agrega tiempo de creado y actualizado
  versionKey: false
})

export default models.Task || model('Task', taskSchema)