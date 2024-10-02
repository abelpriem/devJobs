import bcrypt from 'bcrypt'
import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Usuario, Vacante } from '../data/models.js'
import editOffer from '../logic/editOffer.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError, AuthorizationError } = errors

dotenv.config()

describe("editOffer", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Usuario.deleteMany())
    beforeEach(() => Vacante.deleteMany())

    // POSSITIVE CASE
    it("sucess on edit an offer", async () => {
        const newTitle = random.text()
        const newSalary = random.text()
        const password = random.name()
        const hash = await bcrypt.hash(password, 5)

        const user = await Usuario.create({ name: random.name(), email: random.email(), password: hash })
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user._id.toString(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        const updatedOffer = { title: newTitle, location: offer.location, candidates: offer.candidates, url: offer.url, author: offer.author, company: offer.company, contract: offer.contract, description: offer.description, salary: newSalary, skills: offer.skills }

        await editOffer(user._id.toString(), offer.url, updatedOffer)

        const searchOffer = await Vacante.findById(offer._id.toString())

        expect(searchOffer).to.be.an('Object')
        expect(searchOffer.title).not.to.be.equal(offer.title)
        expect(searchOffer.salary).not.to.be.equal(offer.salary)
        expect(searchOffer.location).to.be.equal(offer.location)
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on edit an offer with invalid ID format", async () => {
        const id = random.id()
        const offerUrl = random.text()
        const updatedOffer = random.text()

        try {
            await editOffer(id, offerUrl, updatedOffer)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato ID inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on edit an offer with invalid ID format", async () => {
        const id = random.mongoId()
        const offerUrl = random.text()
        const updatedOffer = random.text()

        try {
            await editOffer(id, offerUrl, updatedOffer)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Oferta no encontrada. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Invalid ID format
    it("fails on edit an offer with invalid ID format", async () => {
        const user = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })
        const otherUser = await Usuario.create({ name: random.name(), email: random.email(), password: random.password() })

        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: user._id.toString(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const updatedOffer = { title: random.text(), location: offer.location, candidates: offer.candidates, url: offer.url, author: offer.author, company: offer.company, contract: offer.contract, description: offer.description, salary: offer.salary, skills: offer.skills }

        try {
            await editOffer(otherUser._id.toString(), offer.url, updatedOffer)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(AuthorizationError)
            expect(error.message).to.be.equal('Usuario no autorizado. Solo el autor puede editar la vacante')
        }
    })

    after(() => mongoose.disconnect())
})