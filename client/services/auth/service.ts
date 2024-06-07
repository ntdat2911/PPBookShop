"use server";
import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto";
import { cookies } from "next/headers";
import { parse } from "cookie";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export async function signIn(params: SignInRequestDto) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/sign-in`,
      params
    );
    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      const parsedCookies = parse(setCookie[0]);
      for (const key in parsedCookies) {
        cookies().set(key, parsedCookies[key], { httpOnly: true });
      }
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signUp(params: SignUpRequestDto) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/sign-up`,
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function confirmEmail(confirmationToken: string) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/confirm-email`,
      { confirmationToken }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/forgot-password`,
      { email }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(params: {
  resetToken: string;
  password1: string;
  password2: string;
}) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/reset-password`,
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/refresh-access`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function changePassword(
  password: string,
  newPassword: string,
  token: string
) {
  try {
    const response = await axios.patch(
      `${SERVER_BASE_URL}/api/auth/update-password`,

      { password, password1: newPassword, password2: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
