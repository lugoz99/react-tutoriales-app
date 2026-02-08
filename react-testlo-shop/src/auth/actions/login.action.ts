import { testoApi } from "@/api/testoApi"
import type { AuthResponse } from "../interfaces/auth.response";


const loginAction = async(email:string, password:string):Promise<AuthResponse> =>{
  try {
    const { data } = await testoApi.post<AuthResponse>('/auth/login',{
      email,password
    })
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }

}

export { loginAction }