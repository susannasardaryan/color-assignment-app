import {createSelector, createSlice} from "@reduxjs/toolkit";

const colorsSlice = createSlice({
    name: "colors",
    initialState: {
        colors: [],
    },
    reducers: create => ({
        setColors: create.reducer((state, action) => {
            state.colors = action.payload
        })
    }),
    selectors: {
        selectColors: createSelector(state => state.colors)
    }
});
export const {setColors} = colorsSlice.actions;
export default colorsSlice.reducer;