import {createSlice} from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: {
            username: '',
            isAdmin: false,
            assignedColor: null
        }
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo.username = action.payload.username;
            state.userInfo.assignedColor = action.payload.color;
        },
        setAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
    },
    selectors: {
        getUserInfo: state => state.userInfo,
    }
})

export default userInfoSlice.reducer;
export const {setUserInfo, setAdmin} = userInfoSlice.actions;
export const {getUserInfo} = userInfoSlice.selectors;