import mongoose from 'mongoose'
const { model, Schema } = mongoose

// USERS
const usuario = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

// MODELS
const Usuario = new model('Usuario', usuario)

// SCHEMAS - VACANTE
const vacante = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: String,
        default: 0,
        trim: true
    },
    contract: {
        type: String,
        trim: true

    },
    description: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [],
    candidates: [{
        name: String,
        email: String,
        cv: String
    }],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: Usuario,
        required: true
    }
})

vacante.index({ title: 'text' })

// MODELS
const Vacante = new model('Vacante', vacante)

export {
    Vacante,
    Usuario
}