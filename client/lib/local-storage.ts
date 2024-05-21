import { AuthTokenResponse, UserDto } from "@/services/auth/dto";

export const getLocalAccessToken = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem("accessToken");
};

export const getLocalUser = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as UserDto;
  }
  return null;
};

export const setLocalAccessToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setLocalUser = (user: UserDto) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const saveAuthStateToLocalStorage = (auth: AuthTokenResponse) => {
  setLocalUser(auth.user);
  setLocalAccessToken(auth.accessToken);
};

export const removeAuthStateFromLocalStorage = () => {
  localStorage.removeItem("user");
  setLocalAccessToken("");
};
