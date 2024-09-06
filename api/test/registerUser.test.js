import mongoose from 'mongoose'
import dotenv from 'dotenv'
import registerUser from '../logic/registerUser.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            registerUser('Prueba', 'prueba@email.com', '123123123', '123123123')
                .then(() => console.log('Usuario creado correctamente!'))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))