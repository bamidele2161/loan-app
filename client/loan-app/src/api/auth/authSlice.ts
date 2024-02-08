import { createSlice } from "@reduxjs/toolkit";

// This slice holds user needed information

interface LoginState {
  staffInfo: any | undefined;
  openUserDrop: boolean;
  password: string;
  userDetails: any | undefined;
  tokenExpiresIn: number;
}

const initialState: LoginState = {
  staffInfo: undefined,
  openUserDrop: false,
  password: "",
  userDetails: undefined,
  tokenExpiresIn: 0,
};

const StaffData = createSlice({
  name: "User data",
  initialState,
  reducers: {
    saveStaffInfo: (state, action) => {
      state.staffInfo = action.payload;
    },
    setOpenUserDrop: (state, action) => {
      state.openUserDrop = action.payload;
    },
    savePassword: (state, action) => {
      state.password = action.payload;
    },
    saveUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    saveTokenExpiresIn: (state, action) => {
      state.tokenExpiresIn = action.payload;
    },
  },
});
export const StaffDataReducer = StaffData.reducer;
export const {
  saveStaffInfo,
  setOpenUserDrop,
  savePassword,
  saveUserDetails,
  saveTokenExpiresIn,
} = StaffData.actions;
