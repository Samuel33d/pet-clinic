import { AppError } from "../../commons/errors/appError.js";
import { catchAsync } from "../../commons/errors/catchAsync.js";
import { uploadFile } from "../../commons/utils/upload-file-cloud.js";
import { encryptedPassword, verifyPassword } from "../../config/plugins/encripted-password.plugin.js";
import { generateUUID } from "../../config/plugins/generate-uuid.plugin.js";
import generateJWT from "../../config/plugins/generateJWT.plugin.js";
import { validateLoginUser, validatePartialUser, validateUser } from "./users.schema.js"
import { UsersServices } from "./users.service.js"



export const register = catchAsync(async (req, res, next) => {
    const {
        hasError,
        errorMessages,
        userData
    } = validateUser(req.body)


    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const path = `user/${generateUUID()}-${req.file.originalname}`
    const photoUrl = await uploadFile.uploadToFirebase(path, req.file.buffer)

    userData.photo = photoUrl

    const user = await UsersServices.create(userData)
    const token = await generateJWT(user.id)


    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
        }
    })

});

export const login = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLoginUser(req.body)



    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }

    const user = await UsersServices.findOneByEmail(userData.email)

    if (!user) {
        return next(new AppError('This account does not exist', 400))
    }

    const isCorrectPassword = await verifyPassword(userData.password, user.password)

    if (!isCorrectPassword) {
        return next(new AppError('Invalid credentials', 401))
    }

    const token = await generateJWT(user.id)


    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
        }
    })
}

);

export const findAllUsers = catchAsync(async (req, res, next) => {

    const users = await UsersServices.findAll()

    return res.status(200).json(users)
});


export const findOneUser = catchAsync(async (req, res, next) => {

    const { user } = req

    return res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
            pets: user.pets
        }
    })

});

export const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req
    const { hasError, errorMessages, userData } = validatePartialUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            error: errorMessages
        })
    }


    await UsersServices.update(user, userData)


    return res.status(200).json({
        status: 'success',
        message: 'User updated succesfully',
    })

});


export const deleteUser = catchAsync(async (req, res, next) => {

    const { user } = req

    await UsersServices.delete(user)

    return res.status(204).json(null)

});

export const changePassword = catchAsync(async (req, res, next) => {

    const { sessionUser } = req

    const { currentPassword, newPassword, duplicatedNewPassword } = req.body

    if (newPassword !== duplicatedNewPassword) {
        return next(new AppError('Passwords do not match', 400))
    }

    if (currentPassword === newPassword) {
        return next(new AppError('The password cannot be equal than the current password', 400))
    }

    const isCorrectPassword = await verifyPassword(currentPassword, sessionUser.password)

    if (!isCorrectPassword) {
        return next(new AppError('Invalid password', 401))
    }

    const encryptedNewPassword = await encryptedPassword(newPassword)

    await UsersServices.update(sessionUser, {
        password: encryptedNewPassword,
        passwordChangedAt: new Date(),
    })

    return res.status(200).json({
        status: 'success',
        message: 'The password has been updated succesfully'
    })
})