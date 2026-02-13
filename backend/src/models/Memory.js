import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
    userId:String, 
    summary:{
        type:String,
        default:""
    }, 
    recentMessages:[
        {
            role:String,
            content:String 
        }
    ]
}); 

export default mongoose.model("Memory",MemorySchema); 