// Importações
import dotenv from "dotenv"; 
dotenv.config(); 
// console.log("GROQ_API_KEY:",process.env.GROQ_API_KEY); 

import express from "express"; 
import cors from "cors";  
import chatRoutes  from "./src/routes/chat.routes.js"; 
import { askGroq } from "./src/services/groq.service.js";
import mongoose from "mongoose";
import Memory from "./src/models/Memory.js"

// Chamando a função
const app = express(); 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

app.use("/api",chatRoutes); 

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Data Base connected "))
.catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send("Backend funcionando"); 
})

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando");
})