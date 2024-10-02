import dotenv from 'dotenv'
import mongoose from 'mongoose'
import deleteOffer from '../logic/deleteOffer.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            deleteOffer('66cddb1f5f695b1236206e0a', 'react-developer-5cfce645sn8')
                .then(() => console.log('Oferta borrada correctamente!'))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))