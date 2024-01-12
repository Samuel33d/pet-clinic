import { Sequelize } from 'sequelize'
import { envs } from '../enviroments/enviroments.js'

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export const authenticated = async () => {
    try {
        await sequelize.authenticate()
        console.log("The connection has been established succesfully!😀")
    } catch (error) {
        console.log(error)
    }
}

export const syncUp = async () => {
    try {
        await sequelize.sync()
        console.log("The connection has been synced succesfully!😀")
    } catch (error) {
        console.log(error)
    }
}


export default sequelize
