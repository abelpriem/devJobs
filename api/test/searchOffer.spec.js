import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Vacante } from '../data/models.js'
import searchOffer from '../logic/searchOffer.js'
import random from './helpers/random.js'
const { NotFoundError, ContentError } = errors

dotenv.config()

describe("searchOffer", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Vacante.deleteMany())
    
    // POSSITIVE CASE
    it("success on search an specific offer", async () => {
        const title1 = 'react'
        
        const offer1 = await Vacante.create({title: title1, location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const offer2 = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const offer3 = await Vacante.create({title: title1, location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })
        const offer4 = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        const offers = await searchOffer('react')

        expect(offers).to.be.an('Array').that.has.lengthOf(2)
        expect(offers[0].title).to.be.equal(offer1.title)
        expect(offers[1].title).to.be.equal(offer3.title)
    })

    // NEGATIVE CASE - Invalid format
    it("fails on search an specific offer with invalid text format", async () => {
        const search = ''
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        try {
            const offerSearched = await searchOffer(search)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato de búsqueda incorrecta. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Offer not found
    it("fails with offer not found", async () => {
        const search = random.text()

        try {
            const offerSearched = await searchOffer(search)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Oferta no encontrada. Inténtelo de nuevo')
        }
    })

    after(() => mongoose.disconnect())
})