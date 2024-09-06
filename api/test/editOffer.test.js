import mongoose from 'mongoose'
import dotenv from 'dotenv'
import editOffer from '../logic/editOffer.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            editOffer('66cddb1f5f695b1236206e0a', 'react-developer-5cfce645sn8', { title: 'React Developer', location: 'Remoto' })
                .then(() => console.log('Vacante editada correctamente!'))
                .catch(error => console.error(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))