import jwt from 'jsonwebtoken'
import { errors } from 'com'
import createNewOffer from '../logic/createNewOffer.js'
const { NotFoundError, ContentError, TokenError } = errors
const { JsonWebTokenError } = jwt

export default async (req, res) => {
    const {title,company,location,salary,contract,description,selectedSkills} = req.body
    const token = req.headers.authorization.substring(7)

    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

    try {
        await createNewOffer(userId, title,company,location,salary,contract,description,selectedSkills)
        res.status(201).send()
    } catch(error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            throw new TokenError(error.message)
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