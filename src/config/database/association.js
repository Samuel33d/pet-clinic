import Appointment from "../../modules/appointments/appointments.model.js";
import Medic from "../../modules/medics/medics.model.js";
import Pet from "../../modules/pets/pets.model.js";
import User from "../../modules/users/users.model.js";


export const initModel = () => {

    User.hasMany(Pet, { foreignKey: 'user_id' });
    Pet.belongsTo(User, { foreignKey: 'user_id' });

    Pet.hasMany(Appointment, { foreignKey: 'pet_id' });
    Appointment.belongsTo(Pet, { foreignKey: 'pet_id' });

    Medic.hasMany(Appointment, { foreignKey: 'medic_id' });
    Appointment.belongsTo(Medic, { foreignKey: 'medic_id' });


}