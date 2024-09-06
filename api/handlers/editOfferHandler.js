import jwt from 'jsonwebtoken'
import { errors } from 'com'
import editOffer from '../logic/editOffer.js'
const { NotFoundError, ContentError, TokenError, AuthorizationError } = errors
const { JsonWebTokenError } = jwt

export default async (req,res) => {
    const { offerUrl } = req.params
    const { updatedOffer } = req.body

    const token = req.headers.authorization.substring(7)
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

    try {
        await editOffer(userId, offerUrl, updatedOffer)
        res.status(201).send()
    } catch(error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            throw new TokenError(error.message)
        }

        if (error instanceof AuthorizationError) {
            status = 401
        }

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}