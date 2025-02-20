import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async ()=>{
  try{
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI)
    console.log("MONGO DB CONNECTED : "+conn.connection.host);

  }
  catch(error){
    console.error("Error connecting to MONGODB : "+error.message);
    process.exit(1);
  }
}
