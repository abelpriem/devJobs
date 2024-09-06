import mongoose from 'mongoose'
import dotenv from 'dotenv'
import retrieveOffersAuthor from '../logic/retrieveOffersAuthor.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            retrieveOffersAuthor('66cddb1f5f695b1236206e0a')
                .then(offers => console.log('Estas son las ofertas disponibles: ', offers))
                .catch(error => console.error(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))