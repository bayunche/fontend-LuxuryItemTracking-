import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State, USER } from "./module/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: State = {
    userId: '',
    authToken: '',

};
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<USER>) => {
            state.userId = action.payload.userId;
            state.authToken = action.payload.authToken;
            AsyncStorage
                .setItem("userId", action.payload.userId)
                .then(() => {
                    // console.log("userId saved");
                })
                .catch((error) => {
                    // console.log(error);
                });
            AsyncStorage
                .setItem("authToken", action.payload.authToken)
                .then(() => {
                    // console.log("authToken saved");
                })
                .catch((error) => {
                    // console.log(error);
                });
            return state;
        },
        logout: (state) => {

            // console.log("logout");
            state.userId = "";
            state.authToken = '';
            AsyncStorage.removeItem("userId").catch((error) => {
                // console.log(error);
            });
            AsyncStorage.removeItem("authToken").catch((error) => {
                // console.log(error);
            });


            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;