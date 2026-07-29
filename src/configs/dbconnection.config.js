import mongoose from "mongoose";
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8','0.0.0.0'])

async function connectionDB() {
    try{
        if(!process.env.MONGO_URI){
            console.log("mongouri missing in env")
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo Db Connected")
    }
    catch(error){
        console.log("mongoerror",error)
    }
}

export default connectionDB;