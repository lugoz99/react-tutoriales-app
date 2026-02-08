import { testoApi } from "@/api/testoApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async( ):Promise<AuthResponse>=>{
  const token = localStorage.getItem('token');
  if(!token) throw new Error("Token not foundm!");
  try {
    const { data } = await testoApi.get<AuthResponse>('/auth/check-status')
    localStorage.setItem('token',data.token)
    return data;
  } catch (error) {
    console.log(error)
    localStorage.removeItem('token')
    throw new Error('token expired or not valid!');
  }

}