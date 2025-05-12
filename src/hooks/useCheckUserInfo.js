import {StorageService} from "../services/StorageService.js";
import {PARTICIPANTS_PATH, USER_INFO_KEY} from "../api/constants.js";
import {doGet} from "../api/apiService.js";
import {setUserInfo} from "../features/userInfo/userInfoSlice.js";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useCheckUserInfo = () => {
    const dispatch = useDispatch();
    const userInfo = StorageService.getItem(USER_INFO_KEY);

    useEffect(() => {
        doGet(PARTICIPANTS_PATH).then(participants => {
            if (participants == null) {
                StorageService.removeItem(USER_INFO_KEY);
                dispatch(setUserInfo({}));
            }
        });
    }, [dispatch]);

    return userInfo;
}