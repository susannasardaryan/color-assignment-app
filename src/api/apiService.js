import { AVAILABLE_COLORS_URL, PARTICIPANTS_URL } from "./constants.js";
import { getDatabase, ref, get, set } from "firebase/database";
import { initializeApp } from "firebase/app";

const app = initializeApp({ databaseURL: AVAILABLE_COLORS_URL });
const db = getDatabase();

export const doGet = async () => {

    return get(ref(db, '/availableColors')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot);
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}

export const doPost = async (name) => {

    set(ref(db, '/participants' + '/participant'+Date.now()), {
        name: name,
        color: 'red',
        hex: '#ff0000'
    });
}