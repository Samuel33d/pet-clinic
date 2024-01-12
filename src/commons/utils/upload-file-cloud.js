import { utilsFireBase } from "../../config/plugins/firebase.plugin.js";

export class uploadFile {
    static async uploadToFirebase(path, data) {
        const imgRef = utilsFireBase.ref(
            utilsFireBase.storage,
            path
        )

        //subir la imagen
        await utilsFireBase.uploadBytes(imgRef, data)
        // devolver la url
        return await utilsFireBase.getDownloadURL(imgRef)
    }
}