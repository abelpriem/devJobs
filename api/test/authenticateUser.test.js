import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authenticateUser from '../logic/authenticateUser.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            authenticateUser('devjobs@email.com', '123123123')
                .then(data => console.log('Usuario logeado: ', data))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))