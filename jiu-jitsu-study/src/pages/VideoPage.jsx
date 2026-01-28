import { useState } from "react"; 
import { chatbot } from "../chatbot/chatbot"; 
 
export default function VideoPage({video,onBack}){
const [question,setQuestion] = useState(""); 
const [answer,setAnswer] = useState("")

function handleAsk(){
 const response = chatbot(question,video);  
 setAnswer(response) 
}

return(
    <div style={{padding:"24px"}}>
        <h1>{video.title}</h1>
        <p>Nível: {video.level}</p> 

        <p><strong>Resumo do video:</strong>{video.summary}</p>
        <ul>
            <p>Quando aplicar:</p>
            {Array.isArray(video.applyTips) ? video.applyTips.map((tip,index)=><li key={index}>{tip}</li>):<li>{video.applyTips}</li>}
        </ul>
                <br />Video do Youtube  <br />
                <h3>Chat bot treinador</h3> 
                
                 <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Digite sua Dúvida" style={{width:"300px",height:"100px"}}/> 

                <button onClick={handleAsk} style={{marginLeft:"15px",margin:"20px"}}>Perguntar</button>
                
               {answer &&(
                <div style={{marginTop:"15px",padding:"10px",color:"#7bf781"}}>resposta: {answer}</div>
               )} 
        <button onClick={onBack} style={{marginTop:"20px"}}>Voltar para as Categorias</button>
    </div>
    ); 
}