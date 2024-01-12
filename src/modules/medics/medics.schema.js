import z from 'zod'
import { extractValidationData } from '../../commons/utils/extractErrorData.js'

const medicSchema = z.object({
    dni: z.string().min(5).max(20),
    name: z.string().min(3).max(60),
    surname: z.string().min(3).max(60),
    speciality: z.array(z.string())
})


export const validateMedic = (data) => {
    const result = medicSchema.safeParse(data)

    const { hasError, errorMessages, data: medicData } = extractValidationData(result)

    return { hasError, errorMessages, medicData }
}

export const validatePartialMedic = (data) => {
    const result = medicSchema.partial().safeParse(data)

    const { hasError, errorMessages, data: medicData } = extractValidationData(result)

    return { hasError, errorMessages, medicData }
}