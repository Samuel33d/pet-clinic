import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { MedicsServices } from "./medics.service.js";

export const validateExistMedic = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const medic = await MedicsServices.findOne(id)

    if (!medic) {
        return next(new AppError(`Medic with id ${id} does not exist`, 404))
    }
    
    req.medic = medic
    next()
});
