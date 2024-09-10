import express from 'express'
import 'dotenv/config'
import authRouter from './routes/auth.routes.js'
import { connectDB } from './config/connectDB.config.js'
import cors from 'cors'
import messageRouter from './routes/message.routes.js'

// variables
const app=express()
const PORT=process.env.PORT


// middlewares
app.use(cors())
app.use(express.json()) // to parse the incoming req with json payload from req.body 

// routes
app.use('/api/auth',authRouter)


app.use('/api/messages', messageRouter)

app.get('/',(req,res)=>{
    res.send("Hello Jarvis")
})




app.listen(PORT,()=>{
    connectDB()
    console.log("server is running")
})
