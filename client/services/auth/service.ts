"use server";
import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export async function signIn(params: SignInRequestDto) {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/auth/sign-in`,
      params
    );
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
