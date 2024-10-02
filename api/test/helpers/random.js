import { Types } from 'mongoose'
const { ObjectId } = Types

function name() {
    return `name-${Math.random()}`
}

function email() {
    return `email-${Math.random()}@gmail.com`
}

function password() {
    return `password-${Math.random()}`
}

function text() {
    return `text-${Math.random()}`
}

function id() {
    return `ID-${Math.random()}`
}

function mongoId() {
    return new ObjectId().toString()
}

const random = {
    name,
    email,
    password,
    text,
    id,
    mongoId
}

export default random
