import mongoose from 'mongoose'
import dotenv from 'dotenv'
import changeUserPassword from '../logic/changeUserPassword.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            changeUserPassword('userId','password', 'newPassword', 'repeatNewPassword')
                .then(() => console.log('Contraseña cambiada correctamente!'))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))