import cors from 'cors'

export const enableCors = (app, acceptedOrigins) => {

    //! app.use(cors()) para aceptar peticiones de todos los servidores

    //! Para permitir peticiones sólo desde los servidores que le pase en acceptedOrigins e incluyo el !origin porqué si hacemos peticiones desde nuestro servidor local, no llegará algún origin 
    app.use(cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }

            if (!origin) {
                return callback(null, true)
            }

            return callback(new Error('Not allowed by CORS'))
        }
    }))
}