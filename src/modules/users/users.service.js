import Pet from "../pets/pets.model.js";
import User from "./users.model.js";


export class UsersServices {

    static async create(data) {
        return await User.create(data)
    }

    static async findOne(id) {
        return await User.findOne({
            where: {
                status: true,
                id
            },
            include: [{
                model: Pet,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'user_id', 'userId']
                }
            }]
        })
    }

    static async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }

    static async findAll() {
        return await User.findAll({
            attributes: {
                exclude: ['password', 'passwordChangedAt', 'status', 'createdAt', 'updatedAt']
            },
            where: {
                status: true
            },
            include: [{
                model: Pet, 
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'user_id', 'userId']
                }
            }]
        })
    }

    static async update(user, data) {
        return await user.update(data)
    }

    static async delete(user) {
        return await user.update({
            status: false
        })
    }
}