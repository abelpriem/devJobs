import bcrypt from 'bcrypt'
import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario } from '../data/models.js'
import changeUserData from '../logic/changeUserData.js'
import random from './helpers/random.js'
const { ContentError, NotFoundError, CredentialsError } = errors

dotenv.config()

describe("changeUserData", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE
    it("sucess with change data from user - name", async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const newName = random.name()
        
        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: name, email: email, password: hash })

        const dataUser = { name: newName, email: email, password: password }

        await changeUserData(user.id, dataUser)

        const userUpdated = await Usuario.findById(user.id).lean()

        expect(userUpdated).to.be.an("object")
        expect(user._id.toString()).to.be.equal(userUpdated._id.toString())
        expect(userUpdated.name).to.be.equal(newName)
    })

    // POSSITIVE CASE
    it("sucess with change data from user - email", async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const newEmail = random.email()
        
        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: name, email: email, password: hash })

        const dataUser = { name: name, email: newEmail, password: password }

        await changeUserData(user.id, dataUser)

        const userUpdated = await Usuario.findById(user.id).lean()

        expect(userUpdated).to.be.an("object")
        expect(user._id.toString()).to.be.equal(userUpdated._id.toString())
        expect(userUpdated.email).to.be.equal(newEmail)
    })

    // NEGATIVE CASE - Invalid format ID
    it("fails on change user data with invalid ID", async () => {
        const dataUser = { name: random.name(), email: random.email(), password: random.password() }
        const id = random.id()

        try {
            await changeUserData(id, dataUser)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it("fails on change user data with empty fileds", async () => {
        const dataUser = { name: '', email: random.email(), password: random.password() }
        const id = random.mongoId()

        try {
            await changeUserData(id, dataUser)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - User not found
    it("fails on user not found", async () => {
        const dataUser = { name: random.email(), email: random.email(), password: random.password() }
        const id = random.mongoId()

        try {
            await changeUserData(id, dataUser)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Wrong credentials
    it("fails on user not found", async () => {
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const dataUser = { name: user.name, email: user.email, password: random.password() }

        try {
            await changeUserData(user._id.toString(), dataUser)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.be.equal('Credentiales incorrectas. Vuelva a intentarlo')
        }
    })

    after(() => mongoose.disconnect())
})



