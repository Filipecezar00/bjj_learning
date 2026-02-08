import  OpenAI  from "openai";  

let openai; 

function getClient(){
    if(!openai){
        if(!process.env.OPENAI_API_KEY){
            throw new Error("OPENAI_API_KEY não carregada"); 
        }
        openai = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY 
        }); 
    }
    return openai; 
}

export async function askAI(prompt){   
const client = getClient() 

const response =  await client.chat.completions.create({
    model:"gpt-4o-mini", 
        messages:[
            {
                role:'system', 
                content:"Você é um treinador de jiu-jitsu experiente, didático, objetivo e com pouca paciência"   
            }, 
            {
                role:"user",
                content:prompt 
            }
        ], 
        temperature:0.7  
    })
    return response.choices[0].message.content; 
}
export default openai;  