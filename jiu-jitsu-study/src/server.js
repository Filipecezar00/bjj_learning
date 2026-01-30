// Importações
import express from "express"; 
import cors from "cors"; 
import chatRoutes from "./routes/chat.routes.js"; 

// Chamando a função
const app = express(); 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rota do chat
app.use("/chat",chatRoutes); 

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando")
})