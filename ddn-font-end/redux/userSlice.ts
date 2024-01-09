import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State, USER } from "./module/user";

const initialState: State = {
    userId: null,
    authToken: null,

};
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<USER>) => {
            state.userId = action.payload.userId;
            state.authToken = action.payload.authToken;
        },
        logout: (state) => {
            state.userId = null;
            state.authToken = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;