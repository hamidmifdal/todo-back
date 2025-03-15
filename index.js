import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Connectdb from './db/mongoose.js'
import todos from './router/route_Todos.js'
import user from './router/route_Users.js'
import authenticateToken from './router/route_Auth.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.get('/',(req,res)=>{
    return res.status(200).json({message:"api ok"})
})
app.use(cors(
    {
        origin: ['http://localhost:3001', '*',],
        credentials: true,
    }))
app.use(express.json())
app.use('/',authenticateToken)
app.use('/',todos)
app.use('/',user)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
    Connectdb()
})