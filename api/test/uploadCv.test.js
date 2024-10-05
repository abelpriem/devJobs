import dotenv from 'dotenv'
import mongoose from 'mongoose'
import uploadCv from '../logic/uploadCv.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            uploadCv('node-developer-p03jqiqs10o', 'example', 'example@email.com', 'exampleCV.pdf', './uploads/curriculums/0123456789.pdf')
                .then(() => console.log('Currículum añadido exitosamente!'))
                .catch(error => console.error(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))