import bcrypt from 'bcrypt'
import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario } from '../data/models.js'
import authenticateUser from '../logic/authenticateUser.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError, CredentialsError } = errors

dotenv.config()

describe("authenticateUser", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE 
    it('sucess on authenticate registered user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: name, email: email, password: hash})

        const userAuth = await authenticateUser(user.email, password)

        expect(userAuth).to.be.an('object')
        expect(userAuth.id.toString()).to.be.equal(user._id.toString())
        expect(userAuth.username).to.be.equal(user.name)
    })

    // NEGATIVE CASE - Invalid email format
    it('fails on authenticate user with invalid email format', async () => {
        const email = random.name()
        const password = random.password()

        try {
            await authenticateUser(email, password)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato email inválido. Revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it('fails on authenticate user with empty fields', async () => {
        const email = random.name()
        const password = ''

        try {
            await authenticateUser(email, password)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Campos vacíos. Por favor, rellene los campos correctamente')
        }
    })

    // NEGATIVE CASE - User not found
    it('fails on authenticate with user not found', async () => {
        const email = random.email()
        const password = random.password()

        try {
            await authenticateUser(email, password)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Wrong credentials
    it('fails on authenticate with wrong credentials', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const wrongPassword = random.password()

        const hash = await bcrypt.hash(password, 5)
        await Usuario.create({ name: name, email: email, password: hash })

        try {
            await authenticateUser(email, wrongPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.be.equal('Error de credenciales. Inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})
