import { getLocalUser } from "@/lib/local-storage";
import { UserDto } from "@/services/auth/dto";
import { createSlice } from "@reduxjs/toolkit";

type AuthState =
  | {
      isLogged: false;
      user?: null;
    }
  | {
      user: UserDto | null;
      isLogged: true;
    };

const initialState: AuthState =
  getLocalUser() == null
    ? { isLogged: false }
    : { user: getLocalUser(), isLogged: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
