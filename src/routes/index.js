import express from 'express'
import { router as usersRouter } from '../modules/users/users.route.js'
import { router as petsRouter } from '../modules/pets/pets.route.js'
import { router as medicsRouter } from '../modules/medics/medics.route.js'
import { router as appointmentsRouter } from '../modules/appointments/appointments.route.js'
import { protect } from '../modules/users/users.middleware.js'


const router = express.Router()

router.use('/users', usersRouter)

router.use(protect)
router.use('/pets', petsRouter)
router.use('/medics', medicsRouter)
router.use('/appointments', appointmentsRouter)

export default router

