import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario, Vacante } from '../data/models.js'
import retrieveOffersAuthor from '../logic/retrieveOffersAuthor.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe("retrieveOffersAuthor", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())
    beforeEach(() => Vacante.deleteMany())

    // POSSITIVE CASE
    it("success on retrieve all offers from author", async () => {
        const user1 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const user2 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })

        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user1.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user1.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user2.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        const offersAuthor = await retrieveOffersAuthor(user1.id)

        expect(offersAuthor).to.be.an("Array").that.has.lengthOf(2)
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on retrieve offers author with invalid ID format", async () => {
        const userId = random.id()

        try {
            await retrieveOffersAuthor(userId)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - User not found
    it("fails on retrieve offers author with invalid ID format", async () => {
        const userId = random.mongoId()

        try {
            await retrieveOffersAuthor(userId)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Por favor, vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - No author offers created
    it("fails on retrieve offers author with author offers not yet created", async () => {
        const user1 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const user2 = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })

        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user2.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user2.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user2.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        try {
            await retrieveOffersAuthor(user1.id)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('No hay ningúna oferta creada todavía...')
        }
    })

    after(() => mongoose.disconnect())
})