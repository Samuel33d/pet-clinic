import express from 'express'
import { createPets, deletePet, findAllPets, findOnePet, updatePet } from './pets.controller.js'
import { validateExistPet } from './pets.middleware.js'
import { uploadSingle } from '../../config/plugins/upload-file.plugin.js'

export const router = express.Router()

router
    .route('/')
    .get(findAllPets)
    .post(uploadSingle('photo'),createPets)

router
    .route('/:id')
    .get(validateExistPet, findOnePet)
    .patch(validateExistPet, updatePet)
    .delete(validateExistPet, deletePet)