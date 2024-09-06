import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createNewOffer from '../logic/createNewOffer.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        try {
            createNewOffer('Desarrollador Jr. Full-Stack', 'AirBnb', 'Remoto', '1200€', 'Por Proyecto', 'Se requiere Desarrollador Web Junior Full-Stack, que quiera trabajar por proyectos o Freelance y que tenga entre 1 y 2 años de experiencia. Se necesitan conocimientos demostrables tanto de JavaScript como TypeScript, para trabajar con Angular, NodeJS y Express para el desarrollo del backend. Totalmente remoto.', ['JavaScript', 'TypeScript', 'Angular', 'NodeJS', 'Express'])
                .then((vacante) => console.log('Vacante creada correctamente!', vacante))
                .catch(error => console.log(error))
        } catch(error) {
            console.log(error)
        }
    })
    .catch(error => console.log(error))