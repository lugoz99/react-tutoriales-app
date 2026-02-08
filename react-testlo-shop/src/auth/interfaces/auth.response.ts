import type { User } from "@/types/user.interface";
// Login || register || checkstatus -> sirve para estos
export interface AuthResponse{
  user:User
  token:string;
}