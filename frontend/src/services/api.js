const API_URL = "http://localhost:3000"; 

export async function askChat(question,video){
    const response = await fetch(`${API_URL}/chat`,{
    method:'POST',
    headers:{"Cotent-Type":"application/json"},
    body:JSON.stringify({question,video}) 
    })
    if(!response.ok){
        throw new error ("Erro na API")
    }
    return response.json() 
}