import mongoose from 'mongoose'
import dotenv from 'dotenv'
import retrieveUser from '../logic/retrieveUser.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            retrieveUser('66cddb1f5f695b1236206e0a')
                .then(user => console.log('Bienvenido: ', user))
                .catch(error => console.error(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))