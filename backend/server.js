// Importações
import dotenv from "dotenv"; 
dotenv.config(); 
console.log("GROQ_API_KEY:",process.env.GROQ_API_KEY); 

import express from "express"; 
import cors from "cors";  
import chatRoutes  from "./src/routes/chat.routes.js"; 
import { askGroq } from "./src/services/groq.service.js";


// Chamando a função
const app = express(); 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

app.use("/api",chatRoutes); 

app.get('/',(req,res)=>{
    res.send("Backend funcionando"); 
})

app.post("/api/chatbot",async(req,res)=>{
try{
    const {prompt,video} = req.body; 

    if(!prompt || !prompt.trim()) {
        return res.status(400).json({error:"Por favor mande uma Pergunta"}); 
    }; 
    if(!video){
        return res.status(400).json({error:"Video indisponivel para acesso"}); 
    }
    const resposta = await askGroq(prompt,video); 
    res.json({resposta}); 
}
catch(error){
    console.error("Erro ao consumir a aplicação" + error);  
    res.status(500).json({error:"Erro no servidor"}); 
}
}); 

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando");
})