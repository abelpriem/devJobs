import { Vacante } from '../data/models.js'
import { errors } from 'com'
const { SystemError, NotFoundError } = errors

export default async function retrieveOffers() {
    try {
        const offers = await Vacante.find()

        if (offers.length === 0) {
            throw new NotFoundError('Aún no hay vacantes registradas en la base de datos. Inténtelo de nuevo')
        }

        return offers
    } catch(error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}