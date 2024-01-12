import { initializeApp } from "firebase/app";
import { envs } from "../enviroments/enviroments.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
    apiKey: envs,
    projectId: envs.FIREBASE_PROJECT_ID,
    storageBucket: envs.FIREBASE_STORAGE_BUCKET,
    appId: envs.FIREBASE_APP_ID,
};

const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage(fireBaseApp) 

export const utilsFireBase = {
    storage: storage,
    ref,
    uploadBytes,
    getDownloadURL
}