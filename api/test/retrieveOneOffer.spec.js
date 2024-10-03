import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario, Vacante } from '../data/models.js'
import retrieveOneOffer from '../logic/retrieveOneOffer.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe("retrieveOneOffer", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())
    beforeEach(() => Vacante.deleteMany())

    // POSSITIVE CASE
    it("success on retrieve one selected offer", async () => {
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })

        const offer1 = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const offer2 = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const offer3 = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user.id, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        const offerSelected = await retrieveOneOffer(offer2.url)

        expect(offerSelected).to.be.an("Object")
        expect(offerSelected.offer.title).not.to.be.equal(offer1.title)
        expect(offerSelected.offer.title).not.to.be.equal(offer3.title)
        expect(offerSelected.offer.title).to.be.equal(offer2.title)
    })

    // NEGATIVE CASE - Invalid URL format
    it("fails on retrieve offers author with invalid URL format", async () => {
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: '', author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        try {
            await retrieveOneOffer(offer.url)
            expect('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato URL vacío o inválido... Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Offer not found
    it("fails on offer not found", async () => {
        const offerUrl = random.text()

        try {
            await retrieveOneOffer(offerUrl)
            expect('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Oferta de trabajo no encontrada... Vuelva a intentarlo')
        }
    })

    // NEGATIVE CASE - User not found
    it("fails on user not found", async () => {
        const userId = random.mongoId()
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: userId, company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })


        try {
            await retrieveOneOffer(offer.url)
            expect('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})