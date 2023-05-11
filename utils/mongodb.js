import {connect, connection} from 'mongoose'

const conn = {
  isConnected : false,
}

export const dbConnect = async() => {
  if(conn.isConnected) return
  const db = await connect(process.env.MONGO_URL)
  conn.isConnected = db.connections[0].readyState
  console.log(db.connection.db.databaseName)
}

connection.on('connected', ()=>{
  console.log('Mongodb connected');
})
connection.on('error', (e)=>{
  console.log('Error Mongodb connected' + e);
})
