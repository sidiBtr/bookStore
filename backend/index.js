import express, { response } from 'express'
import {PORT, mongodbUrl} from "./config.js"
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js'
import bookRoutes from './Routes/bookRoutes.js'
import cors from 'cors'
const app = express()
// add middleware to parse request body
app.use(express.json())
// middleware for handling cors policy

app.use(cors())
// allow custom origins
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['Get', 'Post', 'Put', 'Delete'],
        allowedHeaders: ['Content-Type']
    })
)

app.get('/', (request, response)=> {
    console.log(request)
    return response.status(200).send("Welcome to mern stack")
})
app.use('/books', bookRoutes)

mongoose
.connect(mongodbUrl)
.then(()=>{
   console.log("App connected to database") 
   app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`)  
  })
})
.catch((error) => {console.log(error)})
