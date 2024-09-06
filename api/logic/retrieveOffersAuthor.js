import validator from 'validator'
import { Vacante, Usuario } from '../data/models.js'
import { errors } from 'com'
const { SystemError, NotFoundError, ContentError } = errors

export default async function retrieveOffersAuthor(userId) {
    const validateId = validator.isMongoId(userId)

    try {
        if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        }

        const user = await Usuario.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Por favor, vuelva a intentarlo')
        }

        const offers = await Vacante.find({ author: { $in: user._id }}).lean()

        if (!offers) {
            throw new NotFoundError('No hay ningúna oferta creada todavía...')
        }

        return offers
    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}