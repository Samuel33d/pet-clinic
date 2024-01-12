import express from 'express'
import { deleteUser, findAllUsers, findOneUser, login, register, updateUser, changePassword } from './users.controller.js'
import { protect, protectAccountOwner, restrictTo, validateExistUser } from './users.middleware.js'
import { uploadSingle } from '../../config/plugins/upload-file.plugin.js'

export const router = express.Router()

router.post('/register', uploadSingle('photo'), register)
router.post('/login', login)

router.use(protect)

router.get('/', findAllUsers)

router.patch('/change-password', changePassword)

router
    .route('/:id')
    .get(restrictTo('developer', 'receptionist'), validateExistUser, findOneUser)
    .patch(validateExistUser, protectAccountOwner, updateUser)
    .delete(validateExistUser, protectAccountOwner, deleteUser)

