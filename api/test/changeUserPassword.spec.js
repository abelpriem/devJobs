import bcrypt from 'bcrypt'
import { expect } from 'chai'
import errors from 'com/errors.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario } from '../data/models.js'
import changeUserPassword from '../logic/changeUserPassword.js'
import random from './helpers/random.js'
const { ContentError, CredentialsError, NotFoundError } = errors

dotenv.config()

describe("changeUserPassword", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE
    it("success on change user password", async () => {
        const password = random.password()
        const newPassword = random.password()
        const repeatNewPassword = newPassword

        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: hash })

        await changeUserPassword(user._id.toString(), password, newPassword, repeatNewPassword)

        const userUpdated = await Usuario.findById(user._id.toString())
        const match = await bcrypt.compare(newPassword, userUpdated.password)

        expect(userUpdated).to.be.an("Object")
        expect(match).to.be.true
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on change user password with invalid ID format", async () => {
        const id = random.id()
        const password = random.password()
        const newPassword = random.password()
        const repeatNewPassword = newPassword

        try {
            await changeUserPassword(id, password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Emtpy fields on password
    it("fails on change user password with empty fields on password", async () => {
        const id = random.mongoId()
        const password = ''
        const newPassword = random.password()
        const repeatNewPassword = newPassword

        try {
            await changeUserPassword(id, password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - Emtpy fields on newPassword
    it("fails on change user password with empty fields on new password", async () => {
        const id = random.mongoId()
        const password = random.password()
        const newPassword = ''
        const repeatNewPassword = newPassword

        try {
            await changeUserPassword(id, password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - Emtpy fields on repeatNewPassword
    it("fails on change user password with empty fields on repeat new password", async () => {
        const id = random.mongoId()
        const password = random.password()
        const newPassword = random.password()
        const repeatNewPassword = ''

        try {
            await changeUserPassword(id, password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se permite el envío de campos vacíos ni de espacios en blanco... Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - User not found
    it("fails on user not found", async () => {
        const id = random.mongoId()
        const password = random.password()
        const newPassword = random.password()
        const repeatNewPassword = newPassword

        try {
            await changeUserPassword(id, password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Wrong credentials - wrong password
    it("fails on change user password with wrong credentials - password", async () => {
        const password = random.password()
        const otherPassword = random.password()
        const newPassword = random.password()
        const repeatNewPassword = newPassword

        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: hash })

        try {
            await changeUserPassword(user._id.toString(), otherPassword, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.be.equal('Credentiales incorrectas. Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - Wrong credentials - repeat new password
    it("fails on change user password with wrong credentials - repeat new password", async () => {
        const password = random.password()
        const newPassword = random.password()
        const repeatNewPassword = random.password()

        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: hash })

        try {
            await changeUserPassword(user._id.toString(), password, newPassword, repeatNewPassword)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.be.equal('Credentiales incorrectas. Vuelva a intentarlo')
        }
    })

    after(() => mongoose.disconnect())
})