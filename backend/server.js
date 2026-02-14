// Importações
import dotenv from "dotenv"; 
dotenv.config(); 
console.log("GROQ_API_KEY:",process.env.GROQ_API_KEY); 

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

app.post("/api/chatbot",async(req,res)=>{
try{
    const {prompt,video,history} = req.body; 

    if(!prompt || !prompt.trim()) {
        return res.status(400).json({error:"Por favor mande uma Pergunta"}); 
    }; 
    if(!video){
        return res.status(400).json({error:"Video indisponivel para acesso"}); 
    }
    const resposta = await askGroq(prompt,video,history);  
    res.json({resposta}); 
}
catch(error){
    console.error("Erro ao consumir a aplicação", error);  
    res.status(500).json({error:"Erro no servidor"}); 
}
}); 

app.get("/test-db",async(req,res)=>{
    const memory = await Memory.create({
        userId:"teste123",
        summary:"Teste funcionando",
        recentMessages:[]
    });
    res.json(memory) 
})


// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando");
})