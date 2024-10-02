import bcrypt from 'bcrypt'
import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario, Vacante } from '../data/models.js'
import deleteOffer from '../logic/deleteOffer.js'
import random from './helpers/random.js'
const { ContentError, NotFoundError, AuthorizationError } = errors

dotenv.config()

describe("deleteOffer", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())

    // POSSITIVE CASE
    it("success on delete one offer selected", async () => {
        const password = random.password()

        const hash = await bcrypt.hash(password, 5)
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: hash })

        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user._id.toString(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        await deleteOffer(user._id.toString(), offer.url)

        const searchOffer = await Vacante.findById(offer._id.toString())

        expect(searchOffer).to.be.null
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on delete an offer with invalid ID format", async () => {
        const id = random.id()
        const offerUrl = random.text()

        try {
            await deleteOffer(id, offerUrl)
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Invalid URL format
    it("fails on delete an offer with invalid URL format", async () => {
        const id = random.mongoId()
        const offerUrl = ''
        
        try {
            await deleteOffer(id, offerUrl)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Error en la URL de la oferta... Por favor, revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - User not found
    it("fails on delete an offer with user not found", async () => {
        const id = random.mongoId()
        const offerUrl = random.text()
        
        try {
            await deleteOffer(id, offerUrl)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Usuario no encontrado. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Authorization error
    it("fails on delete an offer with no authorization", async () => {
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const otherUser = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user._id.toString(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        try {
            await deleteOffer(otherUser._id.toString(), offer.url)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(AuthorizationError)
            expect(error.message).to.be.equal('Acceso denegado. Solo el autor puede eliminar la oferta')
        }
    })

    after(() => mongoose.disconnect())
})