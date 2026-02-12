import mongoose from "mongoose"; 

const memorySchema = new mongoose.Schema({
    userId:{
        type:String, 
        required:true,
        unique:true 
    }, 
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
},{timestamps:true}); 

export default mongoose.model("Memory",memorySchema);