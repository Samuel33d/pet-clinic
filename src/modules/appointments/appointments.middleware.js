import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { AppointmentsServices } from "./appointments.service.js";

export const validateExistAppointment = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const appointment = await AppointmentsServices.findOne(id)

    if (!appointment) {
        return next(new AppError(`Appointment not found`, 404))
    }

    req.appointment = appointment
    next()
});