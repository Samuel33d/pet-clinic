import express from 'express'
import { deleteAppointment, findAllAppointments, findOneAppointment, scheduleAppointment, updateAppointment } from './appointments.controller.js'
import { validateExistAppointment } from './appointments.middleware.js'

export const router = express.Router()

router.post('/schedule-appointment', scheduleAppointment)
router.get('/', findAllAppointments)


router
    .use('/:id', validateExistAppointment)    
    .route('/:id')
    .get(findOneAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment)