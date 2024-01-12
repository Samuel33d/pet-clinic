import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({ storage })

export const uploadSingle = (filename) => upload.single(filename)

// export const uploadArr = (filename) => upload.array(filename, maxCount: cantidad imagenes que aceptará)