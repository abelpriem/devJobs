import mongoose from 'mongoose'
import dotenv from 'dotenv'
import retrieveOneOffer from '../logic/retrieveOneOffer.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            retrieveOneOffer('node-developer-p03jqiqs10o')
                .then(vacante => console.log('Oferta seleccionada: ', vacante))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))