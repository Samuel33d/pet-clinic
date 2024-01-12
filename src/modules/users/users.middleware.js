import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { envs } from "../../config/enviroments/enviroments.js";
import { UsersServices } from "./users.service.js";

export const validateExistUser = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const user = await UsersServices.findOne(id)

    if (!user) {
        return next(new AppError(`User with id ${id} does not exist`, 404))
    }

    req.user = user
    next()

});

export const protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    };

    if (!token) {
        return next(new AppError('You are not logged in. Please login to get access', 401))
    };

    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)

    const user = await UsersServices.findOne(decoded.id);

    if (!user) {
        return next(new AppError(`The owner of this token is not longer available`, 401))
    };

    if (user.passwordChangedAt) {
        const changedTimeStamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10)

        if (decoded.iat < changedTimeStamp) {
            return next(new AppError('User recently changed the password, please login again', 401))
        }
    }


    req.sessionUser = user;
    next();
});

export const protectAccountOwner = (req, res, next) => {
    const { user, sessionUser } = req

    if (user.id !== sessionUser.id) {
        return next(new AppError('You dont own this account', 401))
    }

    next()
}

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return next(new AppError('You dont have permissions to perfomance this action', 403))
        }
        next()
    }
}