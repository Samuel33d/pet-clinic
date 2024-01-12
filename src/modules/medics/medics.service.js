import Appointment from "../appointments/appointments.model.js";
import Medic from "./medics.model.js";

export class MedicsServices {
    static async create(data) {
        return await Medic.create(data)
    }
    static async findAll() {
        return await Medic.findAll({
            where: {
                status: true
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Appointment,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'pet_id',
                        'medic_id',
                        'petId',
                        'medicId'
                    ]
                },
                where: {
                    status: 'pending'
                },
                required: false
            }]
        })
    }
    static async findOne(id) {
        return await Medic.findOne({
            where: {
                id,
                status: true
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Appointment,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'pet_id',
                        'medic_id',
                        'petId',
                        'medicId'
                    ]
                },
                where: {
                    status: 'pending'
                },
                required: false
            }]
        })
    }
    static async update(medic, data) {
        return await medic.update(data)
    }
    static async delete(medic) {
        return await medic.update({
            status: false
        })
    }
}