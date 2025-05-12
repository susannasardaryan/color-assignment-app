import {StorageService} from "../services/StorageService.js";
import {PARTICIPANTS_PATH, USER_INFO_KEY} from "../api/constants.js";
import {doGet} from "../api/apiService.js";

export const checkUserInfo = () => {
    let userInfo = StorageService.getItem(USER_INFO_KEY);
    doGet(PARTICIPANTS_PATH).then(participants => {
        if (participants == null) {
            userInfo = null;
            StorageService.removeItem(USER_INFO_KEY);
        }
    })
    return userInfo;
}