import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { MedicsServices } from "../medics/medics.service.js";
import { PetsServices } from "../pets/pets.service.js";
import { validateAppointment } from "./appointments.schema.js";
import { AppointmentsServices } from "./appointments.service.js";
import moment from 'moment-timezone'

export const scheduleAppointment = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, appointmentData } = validateAppointment(req.body);

    

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const [pet, medic] = await Promise.all([
        await PetsServices.findOne(appointmentData.petId),
        await MedicsServices.findOne(appointmentData.medicId),
    ]);

    if (!pet) {
        return next(
            new AppError(`Pet with id: ${appointmentData.petId} not found`, 404)
        );
    }

    if (!medic) {
        return next(
            new AppError(`Medic with id: ${appointmentData.medicId} not found`, 404)
        );
    }

    const appointments = await AppointmentsServices.findOneByTimeSQL(appointmentData.medicId, req.body.durationMinutes, appointmentData.startTime)

    if (appointments.length > 0) {
        return next(new AppError('The doctor already has an appointment assigned', 409))
    }

    const appointmentCreated = await AppointmentsServices.create(appointmentData)

    return res.status(201).json(appointmentCreated);
});

export const findAllAppointments = catchAsync(async (req, res, next) => {
    const appointments = await AppointmentsServices.findAll()

    return res.status(200).json({
        appointments
    })
});

export const findOneAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req

    return res.status(200).json({ appointment })
});

export const updateAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req

    await AppointmentsServices.update(appointment)

    return res.status(200).json({
        status: 'success',
        message: 'Appointment completed succesfully'
    })
});

export const deleteAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req


    await AppointmentsServices.delete(appointment)

    return res.status(204).json(null)
});