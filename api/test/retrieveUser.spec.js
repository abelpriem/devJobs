import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario } from '../data/models.js'
import restrieveUser from '../logic/retrieveUser.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe("retrieveUser", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE
    it("success on retrieve user info", async () => {
        const user1 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const user2 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const user3 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })


        const userInfo = await restrieveUser(user2.id)

        expect(userInfo).to.be.an("Object")
        expect(userInfo.name).not.to.be.equal(user1.name)
        expect(userInfo.name).not.to.be.equal(user3.name)
        expect(userInfo.name).to.be.equal(user2.name)
        expect(userInfo.email).to.be.equal(user2.email)
        expect(userInfo.id.toString()).to.be.equal(user2.id)
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on trying to retrieve user with invalid ID format", async () => {
        const userId = random.id()

        try {
            await restrieveUser(userId)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on trying to retrieve user with invalid ID format", async () => {
        const userId = random.mongoId()

        try {
            await restrieveUser(userId)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Por favor, inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})