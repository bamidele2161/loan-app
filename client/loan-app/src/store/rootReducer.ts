"use client";

import { authApi } from "@/api/auth/authService";
import { profileApi } from "@/api/profileService";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  // openSlice,
  // postSlice,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
});

export default reducer;
