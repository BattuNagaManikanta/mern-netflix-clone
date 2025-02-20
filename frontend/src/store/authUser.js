import axios from "axios";
import {create} from "zustand";
import toast from "react-hot-toast";


const useAuthUser = create((set)=>({
  user : null,
  isSigningUp : false,
  isLoggingIn : false,
  isCheckingAuth : false,
  signup : async (credentials)=>{
    set({isSigningUp : true})
    try {
      const response = await axios.post("/api/v1/auth/signup",credentials);
      set({user : response.data.user,isSigningUp : false});
      toast.success("Account created successfully")
    } catch (error) {
      set({ isSigningUp: false });
      toast.error(error.response.data.message || "Signup failed");
    }
  },
  login : async (credentials)=>{
    set({isLoggingIn : true})
    try {
      const response = await axios.post("/api/v1/auth/login",credentials);
      set({user : response.data.user,isLoggingIn : false});
      toast.success("Logged In successfully")
    } catch (error) {
      set({ isLoggingIn : false,user:null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout : async ()=>{
    try {
      const response = await axios.post("/api/v1/auth/logout");
      set({user : null,isSigningUp : false});
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Logout Failed");
    }
  },
  authCheck : async ()=>{
    set({isCheckingAuth : true})
    try {
      const response = await axios.get("/api/v1/auth/authcheck");
      set({user : response.data.user,isCheckingAuth : false})
    } catch (error) {
      set({isCheckingAuth : false , user : null})
    }
  }
}))

export default useAuthUser;