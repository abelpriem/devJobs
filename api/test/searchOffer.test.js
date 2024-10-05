import dotenv from 'dotenv'
import mongoose from 'mongoose'
import searchOffer from '../logic/searchOffer.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            searchOffer('react')
                .then(offers => console.log('Oferta(s) buscada(s): ', offers))
                .catch(error => console.error(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))