import { useState } from "react"; 
import { chatbot } from "../chatbot/chatbot"; 
import{useEffect,useRef} from "react"
import { askChatbot } from "../services/chatbotService";
 
export default function VideoPage({video,question,setQuestion,chatHistory,loading,onAsk,onBack}){

const [loading,setLoading] = useState(false)
const [answer,setAnswer] = useState(""); 
const [error,setError] = useState("") 

async function handleAsk(){
    setLoading(true); 
    setError("");
    setAnswer("");

    try{
        const response = await askChatbot(question,video); 
        setAnswer(response);  
    }catch(error){
        setError("Erro ao falar com o treinador. Tente novamente"); 
    }finally{
        setLoading(false)
    }
}




const chatEndRef = useRef(null); 
 useEffect(()=>{
    chatEndRef.current?.scrollIntoView ({behavior:"smooth"})
},[chatHistory,loading]) ; 

return(
    
    <div style={{padding:"24px"}}>
        <h1>{video.title}</h1>
        <p>Nível: {video.level}</p> 

        <p><strong>Resumo do video:</strong>{video.summary}</p>
        
        <ul>
             <p>Quando aplicar:</p>
             {video.applyTips.map((tip,index)=>(
                <li key={index}>{tip}</li>
             ))}
        </ul>
                <br />Video do Youtube  <br />

                <h3>Chat bot treinador</h3> 
                
                 <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Digite sua Dúvida" style={{width:"300px",height:"100px"}}/> 

                <button onClick={onAsk} disabled={!question.trim()} style={{marginLeft:"15px",margin:"20px",opacity:question.trim() ? 1 : 0.5, cursor:question.trim() ? "pointer" : "not-allowed"}}>Perguntar</button> 

        <div style={{marginTop:"20px"}}>
             {chatHistory.map((item,index)=>(
                <div key={index}>
                    <p>{item.question}</p> 
                    <br />
                    <p>{item.answer}</p>
                    <div ref={chatEndRef}></div>
                </div>
             ))}

             {loading&&(
                <p style={{fontStyle:"italic",color:"rgb(52, 119, 46)"}}> Treinador Pensando</p> 
             )}             
             
         </div>
          
        <button onClick={onBack} style={{marginTop:"20px"}}>Voltar para as Categorias</button>
    </div>
    ); 
}