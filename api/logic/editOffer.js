import { errors } from 'com'
import validator from 'validator'
import { Vacante } from '../data/models.js'
const { SystemError, NotFoundError, ContentError, AuthorizationError } = errors

export default async function editOffer(userId, offerUrl, updatedOffer) {
    const validatorId = validator.isMongoId(userId)

    try {
        if (!validatorId) {
            throw new ContentError('Formato ID inválido. Inténtelo de nuevo')
        } 

        const offerToUpdate = await Vacante.findOne({ url: { $in: offerUrl }})

        if (!offerToUpdate) {
            throw new NotFoundError('Oferta no encontrada. Inténtelo de nuevo')
        } 

        if (offerToUpdate.author.toString() === userId.toString()) {
            offerToUpdate.title = updatedOffer.title
            offerToUpdate.company = updatedOffer.company
            offerToUpdate.location = updatedOffer.location
            offerToUpdate.salary = updatedOffer.salary
            offerToUpdate.contract = updatedOffer.contract
            offerToUpdate.description = updatedOffer.description
            offerToUpdate.skills = updatedOffer.skills

            await offerToUpdate.save()
        } else {
            throw new AuthorizationError('Usuario no autorizado. Solo el autor puede editar la vacante')
        }

    } catch(error) {
        if (error instanceof NotFoundError || error instanceof ContentError || error instanceof AuthorizationError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}