import {AVAILABLE_COLORS_URL, PARTICIPANTS_URL} from "./constants.js";
import { getDatabase , ref, get, child} from "firebase/database";
import { initializeApp } from "firebase/app";


const app = initializeApp({databaseURL: AVAILABLE_COLORS_URL});

export const doGet = async () => {
    const dbRef = ref(getDatabase());
    return get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}

export const doPost = async (name) => {
    // return fetch(PARTICIPANTS_URL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'text/plain;charset=utf-8',
    //     },
    //     body: JSON.stringify({
    //         values: [[name, 'red', '#ff0000']]
    //     })
    // })
}