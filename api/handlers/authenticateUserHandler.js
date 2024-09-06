import jwt from 'jsonwebtoken'
import authenticateUser from '../logic/authenticateUser.js'
import { errors } from 'com'
const { NotFoundError, ContentError, CredentialsError, TokenError } = errors
const { JsonWebTokenError } = jwt

export default async (req, res) => {
    const { email, password } = req.body

    try {
        const { id, username} = await authenticateUser(email, password)
        const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        res.status(200).json({token: token, userId: id, username: username})
    } catch(error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            throw new TokenError(error.message)
        }

        if (error instanceof NotFoundError) {
            status = 404
        }

        if (error instanceof CredentialsError) {
            status = 406
        }

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 409
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    } 
}