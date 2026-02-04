// Importações
import express from "express"; 
import cors from "cors";  

// Chamando a função
const app = express(); 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rota do chat
app.get('/',(req,res)=>{
    res.send("Backend funcionando")
})

app.post("/chatbot",(req,res)=>{
    const {question,video} = req.body 

    if(!question || !video){
        return res.status(404).json({error:"Pergunta ou vídeo ausente"}) 
    }
    console.log("Video recebido no backend:",video) 
    
    const resposta = `
    Técnica : ${video.title} - - - - - - -  
    Resumo da técnica: ${video.summary} - - - - - - -  
    Aplicando na prática: ${video.applyTips.join("\n-")}
    `
    res.json({resposta}); 
})

// Chamada do Servidor  
app.listen(3000,()=>{
    console.log("Servidor rodando")
})