import {COLORS_PATH, DATA_URL, PARTICIPANTS_PATH, RESET_COLORS} from "./constants.js";
import {getDatabase, ref,get, set, update} from "firebase/database";
import {initializeApp} from "firebase/app";

const app = initializeApp({databaseURL: DATA_URL});
const db = getDatabase();

export const doGet = (path = COLORS_PATH) => {
    return get(ref(db, path)).then((snapshot) => {
        return snapshot.val()
    })
        .catch((error) => {
            console.error(error);
        });
}

export const doPost = async (name) => {
    const colors = await doGet();
    const availableColors = Object.entries(colors);
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    const id = Date.now();

    await update(ref(db, '/availableColors'), {
        [randomColor[0]]: null
    });

    await set(ref(db, `${PARTICIPANTS_PATH}/participant_${id}`), {
        id,
        name,
        color: randomColor[1].color,
        hex: randomColor[1].hex
    });

    return randomColor;
}

export const doReset = () => {
    set(ref(db, '/participants'), null);
    set(ref(db, '/availableColors'), RESET_COLORS);
}