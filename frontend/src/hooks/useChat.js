import { useState } from "react"; 
import {askChatbot} from "../services/chatbotService"; 

export function useChat(video){ 
    const [chatHistory,setChatHistory] = useState([]);  
    const [loading,setLoading] = useState(false); 
    const [error,setError] = useState(""); 

    async function ask(question){
        setLoading(true);  
        setError(""); 

        try{
            const answer = await askChatbot(question,video); 
            setChatHistory(prev=>[...prev,{question,answer}]); 
        }catch{
            setError("Erro ao falar com o treinador"); 
        }finally{
            setLoading(false); 
        }
    }
    return{chatHistory,loading,error,ask} 
}
