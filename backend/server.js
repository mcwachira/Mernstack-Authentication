import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { connectDb } from './config/db.js'


dotenv.config()
const PORT =process.env.PORT || 8001

connectDb()
const app = express()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded /form data
app.use(express.urlencoded({ limit: "30mb", extended: true }))

//enabling helmet
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

// //enabling express to locate static files using virtual path /
// app.use('/', express.static(path.join(__dirname, '/public')))


//routes
import userRouter from './routes/userRoute.js'

app.use('/api/v1/users', userRouter)


//static files for our frontend build
if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist'))) //making our dist folder static

    //any path which is not / users will be redirected to index.html
    app.get('*', (req, res)  => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
}else{

app.get('/', (req, res) => 
    res.send('Server is ready '))

}


//handle 404 errors
app.use(notFound)

//handle all other errors
app.use(errorHandler)

app.listen(PORT, () => console.group(`Server started on port ${PORT}`))
