import { configureStore, combineSlices } from "@reduxjs/toolkit"
import userInfoReducer from "../features/userInfo/userInfoSlice.js";

// const rootReducer = combineSlices(userInfoReducer)

const store = configureStore({
    reducer: userInfoReducer,
})

export default store;
