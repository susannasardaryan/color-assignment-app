import {DATA_URL, COLORS_PATH, RESET_COLORS, PARTICIPANTS_PATH} from "./constants.js";
import {get, getDatabase, ref, set, update} from "firebase/database";
import {initializeApp} from "firebase/app";

const app = initializeApp({databaseURL: DATA_URL});
const db = getDatabase();

export const doGet = async () => {
    return get(ref(db, COLORS_PATH)).then((snapshot) => {
        console.log(snapshot.val());
        return snapshot.val()})
        .catch((error) => {
            console.error(error);
        });
}

export const doPost = async (name) => {
    const colors = await doGet(COLORS_PATH);

    const availableColors = Object.entries(colors);

    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    await set(ref(db, `${PARTICIPANTS_PATH}/participant_${Date.now()}`), {
        name,
        color: randomColor[1].color,
        hex: randomColor[1].hex
    });

    return update(ref(db, '/availableColors'), {
        [randomColor[0]]: null
    }).then(() => randomColor);
}

export const doReset = () => {
    set(ref(db, '/participants'), null);
    set(ref(db, '/availableColors'), RESET_COLORS);
}