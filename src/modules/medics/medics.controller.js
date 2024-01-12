import { catchAsync } from "../../commons/errors/catchAsync.js"
import { validateMedic, validatePartialMedic } from "./medics.schema.js"
import { MedicsServices } from "./medics.service.js"

export const findAllMedics = catchAsync(async (req, res, next) => {
    const medics = await MedicsServices.findAll()

    return res.status(200).json({
        medics
    })
})

export const createMedic = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, medicData } = validateMedic(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const medic = await MedicsServices.create(medicData)

    return res.status(201).json({
        medic:{
            id: medic.id,
            dni: medic.dni,
            name: medic.name,
            surname: medic.surname,
            speciality: medic.speciality,
        }
    })
})

export const findOneMedic = catchAsync(async (req, res, next) => {
    const { medic } = req

    return res.status(200).json({
        medic
    })
})

export const updateMedic = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, medicData } = validatePartialMedic(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const { medic } = req

    await MedicsServices.update(medic, medicData)

    return res.status(200).json({
        status: 'success',
        message: 'Medic updated succesfully'
    })

})

export const deleteMedic = catchAsync(async (req, res, next) => {
    const { medic } = req

    await MedicsServices.delete(medic)

    return res.status(204).json(null)
})
