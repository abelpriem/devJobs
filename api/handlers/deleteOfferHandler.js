import jwt from 'jsonwebtoken'
import deleteOffer from '../logic/deleteOffer.js'
import { errors } from 'com'
const { ContentError, NotFoundError, AuthorizationError, TokenError } = errors
const { JsonWebTokenError } = jwt

export default async (req, res) => {
    const token = req.headers.authorization.substring(7)
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

    const { offerUrl } = req.params

    try {
        await deleteOffer(userId, offerUrl)
        res.status(200).send()
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