import z from 'zod'
import { extractValidationData } from '../../commons/utils/extractErrorData.js'

const petSchema = z.object({
    name: z.string().min(2).max(60),
    birthdate: z.string(),
    specie: z.string().min(3).max(60),
    race: z.string().min(3).max(60),
    userId: z.number(),
})

export const validatePet = (data) => {
    const result = petSchema.safeParse(data)

    const { hasError, errorMessages, data: petData } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        petData
    }
}

export const validatePartialPet = (data) => {
    const result = petSchema.partial().safeParse(data)
    
    const { hasError, errorMessages, data: petData } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        petData
    }
}