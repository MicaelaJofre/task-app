import Image from 'next/image'
import { Inter } from 'next/font/google'
import notTask from "../../public/img/delete.png"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({tasks}) {
if(tasks.length === 0){
  return(
  <div className={`flex flex-col min-h-screen justify-center items-center gap-5 ${inter.className}`}>
    <p className='font-bold uppercase text-gray-800'>No hay tareas</p>
    <Image alt={'notTask'} width={150} height={150} src={notTask}/>
  </div>
  )
}
  return (
    <main className={`flex min-h-screen justify-center p-24 ${inter.className}`}>
      <section className='flex justify-between max-w-7xl flex-wrap gap-10'>
        {
          tasks.map(task=>{
            return(
              <div key={task._id} className="max-w-sm w-[250px] max-h-sm h-[160px] rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 truncate">{task.title}</div>
                    <p className="text-gray-700 text-base truncate">{task.content}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <Link href={`task/${task._id}`}>
                    <button className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ver</button>
                  </Link>                  
                  <button className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Editar</button>
                </div>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export async function getServerSideProps(context) {

  const res = await fetch('http://localhost:3000/api/task')
  const tasks = await res.json()

  return {
    props: {tasks}, 
  };
}