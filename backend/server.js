import express from 'express'
import 'dotenv/config'
import authRouter from './routes/auth.routes.js'
import { connectDB } from './config/connectDB.config.js'
import cors from 'cors'
import messageRouter from './routes/message.routes.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import { app,server } from './socket/socket.js'
// variables

const PORT=process.env.PORT


// middlewares
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3003',
    credentials:true
}))
// app.use(cors())

app.use(express.json()) // to parse the incoming req with json payload from req.body 
app.use(express.urlencoded({extends:true}))

// routes
app.use('/api/auth',authRouter)

app.use('/api/messages', messageRouter)

app.use('/api/users', userRouter)

app.get('/',(req,res)=>{
    res.send("Hello Jarvis")
})




server.listen(PORT,()=>{
    connectDB()
    console.log("server is running")
})
