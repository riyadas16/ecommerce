const mongoose = require('mongoose')


const connect = async () => {
    mongoose
        .connect(process.env.DATABASE_CONN)
        .then(() => {
            console.log('Connected')
        })
        .catch(error => {
            console.log(" not connted")
        })

    }


module.exports = connect