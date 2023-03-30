const express = require('express');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')
const connect = require('./app.js')
const app = express()
const dotenv = require("dotenv");
const productTyperouter = require('./router/productTypeRouter');
const productrouter=require('./router/productRouter');
const userrouter = require('./router/userRouter')
const commentrouter = require('./router/commentRouter');
const likedislikerouter = require('./router/likeDislikeRouter')

dotenv.config({ path: './config.env' })
connect()


app.use(express.json())
app.use('/api/v1/user', userrouter)
app.use('/api/v1/producttype', productTyperouter)
app.use('/api/v1/product', productrouter)
app.use('/api/v1/comment', commentrouter)
app.use('/api/v1/likedislike', likedislikerouter)
app.all('*', (req, res, next) => {
    next(new AppError(`can't find  ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)
process.on('uncaughtException', err => {
    console.log('Uncaught Exception')
    console.log(err.name, err.message)
})

PORT = process.env.PORT || 5001
const application = app.listen(PORT, () => {
    console.log('Listening', PORT)
})

process.on('unhandledRejection', err => {

    console.log('Unhandled Rejection')
    console.log(err.name, err.message)
    application.close(() => {
        process.exit(1)
    })
})


