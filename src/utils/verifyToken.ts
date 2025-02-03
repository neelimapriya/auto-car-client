import { TUser } from "@/redux/features/auth/authSlice"
import { jwtDecode } from "jwt-decode"

export const verifyToken=(token:string)=>{
    const decode:TUser=jwtDecode(token) 
return decode
}