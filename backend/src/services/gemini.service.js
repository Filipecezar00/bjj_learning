import  {GoogleGenerativeAI} from "@google/generative-ai";   
import "dotenv/config" 

const key = process.env.GEMINI_API_KEY
console.log("---------------------------------------------------------------------------------")
console.log("Debug da Chave"); 
console.log("A chave começa com AIza?",key?.startsWith("AIza")); 
console.log("Tamanho da Chave:",key?.length) 
console.log("Tem espaços no final?",key !== key?.trim()?"SIM" : "NÃO")  
console.log("---------------------------------------------------------------------------------")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 const model = genAI.getGenerativeModel({
        model: "gemini-1.0-pro",  
    }); 

export async function askGemini(prompt){ 
    const result = await model.generateContent(prompt);  
    return result.response.text(); 
}

