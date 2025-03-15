import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function Connectdb(){
    try {
        const db = await mongoose.connect(process.env.URLMONGO)
          console.log(`mongoose is connect host: ${db.connection.host}`)
    } catch (error) {
        console.error(`error : ${error.message}`)
    }
}
export default Connectdb;