import { configureStore } from "@reduxjs/toolkit"
import colorsReducers from "../features/colorsSlice.js";
const store = configureStore({
    reducer: colorsReducers,
})

export default store;
