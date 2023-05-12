'use client'
import Image from "next/image"
import task from "../../public/img/outbox.png"

const Navbar = () => {


  return (
    <div className="bg-zinc-800 text-white flex items-center justify-between px-6 py-3">
      <Image alt={'newTask'} width={40} height={40} src={task} />
      <button className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Crear nueva tarea</button>
    </div>
  )
}

export default Navbar