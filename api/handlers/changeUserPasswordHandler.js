import jwt from 'jsonwebtoken'
import { errors } from 'com'
import changeUserPassword from '../logic/changeUserPassword.js'
const { JsonWebTokenError } = jwt
const { CredentialsError, ContentError, NotFoundError, TokenError } = errors

export default async (req, res) => {
    const token = req.headers.authorization.substring(7)
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

    const { password, newPassword, repeatNewPassword } = req.body

    try {
        await changeUserPassword(userId, password, newPassword, repeatNewPassword)
        res.status(200).send()
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