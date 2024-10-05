import { errors } from 'com'
import validator from 'validator'
import { Vacante } from '../data/models.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function searchOffer(offerSearched) {
    const validateFormat = !validator.isEmpty(validator.trim(offerSearched))

    try {
        if (!validateFormat) {
            throw new ContentError('Formato de búsqueda incorrecta. Inténtelo de nuevo')
        }

        const offers = await Vacante.find({ $text: { $search : offerSearched}}).lean()

        if (offers.length === 0) {
            throw new NotFoundError('Oferta no encontrada. Inténtelo de nuevo')
        }

        return offers
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}