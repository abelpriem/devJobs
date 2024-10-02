import bcrypt from 'bcrypt'
import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario } from '../data/models.js'
import registerUser from '../logic/registerUser.js'
import random from './helpers/random.js'
const { ContentError, DuplicityError, CredentialsError } = errors

dotenv.config()

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE
    it('success with register new user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const repeatPassword = password

        await registerUser(name, email, password, repeatPassword)

        const user = await Usuario.findOne({email}).lean()
        const match = await bcrypt.compare(password, user.password)

        expect(user).to.be.an('object')
        expect(user.name).to.be.equal(name)
        expect(user.email).to.be.equal(email)
        expect(match).to.be.true
    })

    // NEGATIVE CASE - Invalid email format
    it('fails register new user with invalid email format', async () => {
        const name = random.name()
        const email = random.name()
        const password = random.password()
        const repeatPassword = password

        try {
            await registerUser(name, email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato de email inválido. Por favor, vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it('fails register new user with empty fields - name', async () => {
        const name = ''
        const email = random.email()
        const password = random.password()
        const repeatPassword = password

        try {
            await registerUser(name, email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Campos vacíos. Por favor, reviselos y vuelva a enviarlos')
        }
    })

    // NEGATIVE CASE - Empty fields
    it('fails register new user with empty fields - password', async () => {
        const name = random.name()
        const email = random.email()
        const password = ''
        const repeatPassword = password

        try {
            await registerUser(name, email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Campos vacíos. Por favor, reviselos y vuelva a enviarlos')
        }
    })

    // NEGATIVE CASE - Empty fields
    it('fails register new user with empty fields - repeatPassword', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const repeatPassword = ''

        try {
            await registerUser(name, email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Campos vacíos. Por favor, reviselos y vuelva a enviarlos')
        }
    })

    // NEGATIVE CASE - Empty fields
    it('fails with different credentials', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const repeatPassword = random.password()

        try {
            await registerUser(name, email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.be.equal('La contraseña y su repetición han de ser iguales... Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - User already exist
    it("fails on user already exist", async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const repeatPassword = password
        
        const user = await Usuario.create({ name: name, email: email, password: password, repeatPassword: repeatPassword })

        try {
            await registerUser(name, user.email, password, repeatPassword)
            throw new Error('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.be.equal('Usuario ya registrado. Inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})

