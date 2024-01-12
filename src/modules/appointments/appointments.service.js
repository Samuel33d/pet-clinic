import { QueryTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';
import Appointment from './appointments.model.js';
import moment from 'moment-timezone';
import Pet from '../pets/pets.model.js';
import User from '../users/users.model.js';
import Medic from '../medics/medics.model.js';

export class AppointmentsServices {
  static async create(data) {
    return await Appointment.create(data);
  }
  static async findAll() {
    return await Appointment.findAll({
      attributes: {
        exclude: [
          'id',
          'createdAt',
          'updatedAt',
          'pet_id',
          'medic_id',
          'petId',
          'medicId',
        ],
      },
      where: {
        status: 'pending',
      },
      include: [
        {
          model: Pet,
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt', 'user_id'],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  'id',
                  'password',
                  'birthdate',
                  'passwordChangedAt',
                  'status',
                  'updatedAt',
                  'createdAt',
                ],
              },
            },
          ],
        },
        {
          model: Medic,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
  }
  static async findOne(id) {
    return await Appointment.findOne({
      attributes: {
        exclude: [
          'id',
          'createdAt',
          'updatedAt',
          'pet_id',
          'medic_id',
          'petId',
          'medicId',
        ],
      },
      where: {
        id,
        status: 'pending',
      },
      include: [
        {
          model: Pet,
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt', 'user_id'],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  'id',
                  'password',
                  'birthdate',
                  'passwordChangedAt',
                  'status',
                  'updatedAt',
                  'createdAt',
                ],
              },
            },
          ],
        },
        {
          model: Medic,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
  }
  static async findOneByTimeSQL(medicId, durationMinutes = 30, startTime) {
    const databaseTimeZone = 'US/Eastern';
    const startMoment = moment(startTime).tz(databaseTimeZone);
    const endMoment = startMoment.clone().add(durationMinutes, 'minutes');

    const exactMatchAppointment = await sequelize.query(
      `SELECT * FROM "appointments" WHERE status = :status AND medic_id = :medicId AND start_time = :startTime `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          status: 'pending',
          medicId,
          startTime: startMoment.toISOString(),
        },
      }
    );

    if (exactMatchAppointment.length > 0) {
      return exactMatchAppointment;
    }

    const overlappingAppointments = await sequelize.query(
      `SELECT * FROM "appointments" WHERE status = :status AND start_time < :endTime AND start_time + INTERVAL '30 minutes' > :startTime`,
      {
        type: QueryTypes.SELECT,
        replacements: {
          status: 'pending',
          medicId,
          endTime: endMoment.toISOString(),
          startTime: startMoment.toISOString(),
        },
      }
    );

    return overlappingAppointments;
  }
  static async update(appointment) {
    return await appointment.update({ status: 'completed' });
  }
  static async delete(appointment) {
    return await appointment.update({
      status: 'cancelled',
    });
  }
}
