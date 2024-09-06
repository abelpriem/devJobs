import validator from 'validator'
import { Usuario, Vacante } from '../data/models.js'
import { errors } from 'com'
const { SystemError, AuthorizationError, ContentError, NotFoundError } = errors

export default async function deleteOffer(userId, offerUrl) {
    const validateId = validator.isMongoId(userId)
    const validateUrl = !validator.isEmpty(offerUrl)

    try {
        if (!validateId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        } else if (!validateUrl) {
            throw new ContentError('Error en la URL de la oferta... Por favor, revíselo de nuevo')
        }

        const user = await Usuario.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('Usuario no encontrado. Inténtelo de nuevo')
        }

        const offerToDelete = await Vacante.findOne({ url: { $in: offerUrl }})

        if (offerToDelete.author.toString() === user._id.toString()) {
            await Vacante.findByIdAndDelete(offerToDelete._id)
        } else {
            throw new AuthorizationError('Acceso denegado. Solo el autor puede eliminar la oferta')
        }

    } catch(error) {
        if (error instanceof AuthorizationError || error instanceof NotFoundError || error instanceof ContentError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}