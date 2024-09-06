import mongoose from 'mongoose'
import dotenv from 'dotenv'
import retrieveOffers from '../logic/retrieveOffers.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            retrieveOffers('titulo', 'empresa', 'localizacion', 'salario', 'contrato', 'descripcion', ['skill1', 'skill2'])
                .then(vacantes => console.log('Vacante creada correctamente!', vacantes))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))