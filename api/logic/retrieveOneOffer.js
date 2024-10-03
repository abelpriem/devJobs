import { errors } from 'com'
import validator from 'validator'
import { Usuario, Vacante } from '../data/models.js'
const { SystemError, NotFoundError, ContentError } = errors

export default async function retrieveOneOffer(offerUrl) {
    const validateUrl = !validator.isEmpty(offerUrl)
    
    try {
        if(!validateUrl) {
            throw new ContentError('Formato URL vacío o inválido... Inténtelo de nuevo')
        }

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