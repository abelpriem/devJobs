import mongoose from 'mongoose'
import dotenv from 'dotenv'
import changeUserData from '../logic/changeUserData.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            changeUserData('userId', 'name', 'email', 'password')
                .then(() => console.log('Datos de usuario modificados correctamente!'))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))