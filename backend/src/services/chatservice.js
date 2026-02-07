import {buildPrompt} from "../utils/buildPrompt.js"; 
import { askAI } from "./openai.service.js";  

export async function generateAnswer(question,video){ 
    const prompt = buildPrompt(question,video) 

    const aiResponse = await askAI(prompt) 

    return aiResponse; 
}