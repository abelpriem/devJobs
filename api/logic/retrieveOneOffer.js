import { Vacante, Usuario } from '../data/models.js'
import { errors } from 'com'
const { SystemError, NotFoundError } = errors

export default async function retrieveOneOffer(offerUrl) {
    try {
        const offer = await Vacante.findOne({ url: { $in: offerUrl }}).lean()

        if (!offer) {
            throw new NotFoundError('Oferta de trabajo no encontrada... Vuelva a intentarlo')
        }

        const user = await Usuario.findById(offer.author)

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Inténtelo de nuevo')
        }

        return { offer: offer, author: user.name }
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}