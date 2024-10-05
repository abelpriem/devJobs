import { expect } from 'chai'
import { errors } from 'com'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import mongoose from 'mongoose'
import { Vacante } from '../data/models.js'
import uploadCv from '../logic/uploadCv.js'
import random from './helpers/random.js'
const { ContentError, NotFoundError, DuplicityError } = errors

dotenv.config()

describe("uploadCv", () => {
    before(() => mongoose.connect(process.env.URL_MONGODB_TEST))

    beforeEach(() => Vacante.deleteMany())

    it("succes on upload CV from candidate on local", async () => {
        const name = random.text()
        const email = random.email()
        
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file_testing_uploadCv.pdf'
        await fs.writeFile(oldPath, 'pdf')

        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        await uploadCv(offer.url, name, email, originalName, oldPath)

        const checkOffer = await Vacante.findById(offer.id)

        let fileExist = true

        try {
            await fs.access('./uploads/curriculums/file_testing_uploadCv.pdf')
        } catch (error) {
            fileExist = false
        }

        expect(fileExist).to.be.true
        expect(checkOffer.candidates).to.be.an('Array').that.has.lengthOf(1)
        expect(checkOffer.candidates[0].name).to.be.equal(name)
        expect(checkOffer.candidates[0].email).to.be.equal(email)
        expect(checkOffer.candidates[0].cv).to.be.equal(originalName)
    })

    // NEGATIVE CASE - Invalid email format
    it("fails on upload CV with invalid email format", async () => {
        const name = random.text()
        const email = random.text()
        const offerUrl = random.text()
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file_testing_uploadCv.pdf'

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('Formato de email inválido. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields 
    it("fails on upload CV with empty fields - name", async () => {
        const name = ' '
        const email = random.email()
        const offerUrl = random.text()
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file_testing_uploadCv.pdf'

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it("fails on upload CV with empty fields - URL", async () => {
        const name = random.text()
        const email = random.email()
        const offerUrl = ' '
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file_testing_uploadCv.pdf'

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it("fails on upload CV with empty fields - path", async () => {
        const name = random.text()
        const email = random.email()
        const offerUrl = random.text()
        const oldPath = ' '
        const originalName = 'file_testing_uploadCv.pdf'

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - Empty fields
    it("fails on upload CV with empty fields - file name", async () => {
        const name = random.text()
        const email = random.email()
        const offerUrl = random.text()
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = ' '

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.be.equal('No se pueden enviar campos vacíos... Por favor, revíselo de nuevo')
        }
    })

    // NEGATIVE CASE - Offer not found
    it("fails on upload CV with offer not found", async () => {
        const name = random.text()
        const email = random.email()
        const offerUrl = random.text()
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file_testing_uploadCv.pdf'

        try {
            await uploadCv(offerUrl, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal('Oferta no encontrada. Inténtelo de nuevo')
        }
    })

    // NEGATIVE CASE - Candidate registered on offer
    it("fails on upload CV with candidate already registered for the offer", async () => {
        const name = random.text()
        const email = random.email()
        const oldPath = './uploads/curriculums/0123456789.pdf'
        const originalName = 'file2_testing_uploadCv.pdf'

        await fs.writeFile(oldPath, 'pdf')

        const candidate = { name: name, email: email, cv: originalName }
        const offer = await Vacante.create({title: random.text(), location: random.text(), candidates: [candidate], url: random.text(), author: random.mongoId(), company: random.text(), contract: random.text(), description: random.text(), salary: random.text(), skills: [random.text()] })

        try {
            await uploadCv(offer.url, name, email, originalName, oldPath)
            expect('should not reach this point!')
        } catch(error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.be.equal('Ya está inscrito en la oferta')
        }
    })

    after(() => mongoose.disconnect())
})