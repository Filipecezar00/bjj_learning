const API_URL  = "http://localhost:3000"

export async function askChatbot(question,video){
    try{
        const response = await fetch(`${API_URL}/chatbot`,{   
            method:"POST",
            headers:{
                "Content-Type":"application/json", 
            }, 
            body:JSON.stringify({question,video}), 
        }); 
        if(!response.ok){
            throw new Error("Erro ao consultar o chatbot"); 
        }
        const data = await response.json(); 
        return data.answer; 
    }catch(error){
        console.error("ERRO NO CHATBOT: " + error) 
        throw error; 
    }
}