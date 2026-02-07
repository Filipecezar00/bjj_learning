import  OpenAI  from "openai";  

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY  
}); 

export async function askAI(prompt) 
{    const response =  await client.chat.completions.create({
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