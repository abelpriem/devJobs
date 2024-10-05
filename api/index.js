import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import {
    authenticateUserHandler,
    changeUserDataHandler,
    changeUserPasswordHandler,
    createNewOfferHandler,
    deleteOfferHandler,
    editOfferHandler,
    registerUserHandler,
    retrieveOffersAuthorHandler,
    retrieveOffersHandler,
    retrieveOneOfferHandler,
    retrieveUserHandler,
    searchOfferHandler,
    uploadCvHandler
} from './handlers/index.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_API)
    .then(() => {
        console.log('Database succesfully connected!')

        // CONFIG
        const server = express()
        const jsonBodyParser = express.json()
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        server.use(cors({
            origin: 'https://devjobsweb.netlify.app'
        }))
        server.use(cookieParser())
        
        const upload = multer({ dest: 'uploads/curriculums'})
        server.use('/uploads/curriculums', express.static(path.join(__dirname, 'uploads/curriculums')))

        // ROUTES - NEW OFFER
        server.post('/offers/create', jsonBodyParser, createNewOfferHandler)

        // ROUTE - RETRIEVE ALL OFFERS
        server.get('/offers', retrieveOffersHandler)

        // ROUTE - RETRIEVE AN OFFER
        server.get('/offers/:offerUrl', retrieveOneOfferHandler)

        // ROUTE - EDIT AN OFFER
        server.put('/offers/edit/:offerUrl', jsonBodyParser, editOfferHandler)

        // ROUTE - CREATE ACCOUNT
        server.post('/users/create', jsonBodyParser, registerUserHandler)

        // ROUTE - AUTHENTICATE USER
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        // ROUTE - RETRIEVE USER
        server.get('/users', retrieveUserHandler)

        // ROUTE - RETRIEVE OFFER'S AUTHOR
        server.get('/offers/:userId', retrieveOffersAuthorHandler)

        // ROUTE - CHANGE USER DATA
        server.post('/users/edit-info', jsonBodyParser, changeUserDataHandler)

        // ROUTE - CHANGE USER PASSWORD
        server.post('/users/edit-password', jsonBodyParser, changeUserPasswordHandler)

        // ROUTE - DELETE OFFER
        server.delete('/offer/:offerUrl', deleteOfferHandler)

        // ROUTE - UPLOAD CV-CANDIDATE
        server.post('/upload/cv/:offerUrl', upload.single('cv'), uploadCvHandler)

        // ROUTE - SEARCH OFFER
        server.get('/search-offer/:offerSearched', searchOfferHandler)

        // LISTENING
        server.listen(process.env.PORT, () => console.log(`Server online! Listening on: ${process.env.PORT}`))
    })
    .catch(error =>  console.log(error))