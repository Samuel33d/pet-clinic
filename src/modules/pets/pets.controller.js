import { catchAsync } from "../../commons/errors/catchAsync.js"
import { uploadFile } from "../../commons/utils/upload-file-cloud.js"
import { generateUUID } from "../../config/plugins/generate-uuid.plugin.js"
import { httpClient } from "../../config/plugins/http-client.plugin.js"
import { validatePartialPet, validatePet } from "./pets.schema.js"
import { PetsServices } from "./pets.service.js"


export const createPets = catchAsync(async (req, res, next) => {

    const dataBody = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        specie: req.body.specie,
        race: req.body.race,
        userId: +req.body.userId,
    }

    const { hasError, errorMessages, petData } = validatePet(dataBody)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const path = `pet/${generateUUID()}-${req.file.originalname}`
    const photoUrl = await uploadFile.uploadToFirebase(path, req.file.buffer)

    const medicalCardNumber = generateUUID()
    const results = await httpClient.get(`http://localhost:4000/api/v1/genetic-diseases?specie=${petData.specie}`)
    const diseases = results.geneticDiseases.map(disease => disease.name)

    petData.medicalCardNumber = medicalCardNumber
    petData.genetic_diseases = diseases
    petData.photo = photoUrl

    const pet = await PetsServices.create(petData)

    return res.status(201).json({
        pet,
    })

})

export const findAllPets = catchAsync(async (req, res, next) => {
    const pets = await PetsServices.findAll()

    return res.status(200).json({
        pets
    })
})

export const findOnePet = catchAsync(async (req, res, next) => {
    const { pet } = req



    return res.status(200).json({
        pet
    })
})

export const updatePet = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, petData } = validatePartialPet(req.body)
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const { pet } = req

    await PetsServices.update(pet, petData)

    return res.status(200).json({
        status: 'success',
        message: 'Pet updated succesfully'
    })
})

export const deletePet = catchAsync(async (req, res, next) => {
    const { pet } = req

    await PetsServices.delete(pet)

    return res.status(204).json(null)
})