import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario, Vacante } from '../data/models.js'
import retrieveOffers from '../logic/retrieveOffers.js'
import random from './helpers/random.js'
const { NotFoundError } = errors

dotenv.config()

describe("retrieveOffers", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())
    beforeEach(() => Vacante.deleteMany())

    // POSSITIVE CASE
    it("success on retrieve all offers", async () => {
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        const offers = await retrieveOffers()

        expect(offers).to.be.an('Array').that.has.lengthOf(3)
    })

    // NEGATIVE CASE - User not found
    it("fails on none vacances created yet", async () => {
        try {
            const offers = await retrieveOffers()
            expect('should not reach this point"')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Aún no hay vacantes registradas en la base de datos. Inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})