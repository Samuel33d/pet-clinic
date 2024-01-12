import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { PetsServices } from "./pets.service.js";

export const validateExistPet = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const pet = await PetsServices.findOne(id)

    if (!pet) {
        return next(new AppError(`Pet with id ${id} does not exist`, 404))
    }

    req.pet = pet
    next()
});
