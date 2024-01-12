import User from "../users/users.model.js";
import Pet from "./pets.model.js";

export class PetsServices {
    static async create(data) {
        return await Pet.create(data)
    }
    static async findAll() {
        return await Pet.findAll({
            where: {
                status: true
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'userId',
                    'user_id']
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password', 'passwordChangedAt', 'status',
                        'createdAt',
                        'updatedAt']
                },
            }]
        })
    }
    static async findOne(id) {
        return await Pet.findOne({
            where: {
                id,
                status: true
            }
        })
    }
    static async update(pet, data) {
        return await pet.update(data)
    }
    static async delete(pet) {
        return await pet.update({
            status: false
        })
    }
}