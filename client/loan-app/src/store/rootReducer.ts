"use client";

import { authApi } from "@/api/auth/authService";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  // openSlice,
  // postSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export default reducer;
