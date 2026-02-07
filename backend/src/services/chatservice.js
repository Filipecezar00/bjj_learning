import {buildPrompt} from "../utils/buildPrompt"; 
import { askAI } from "./openai.service";  

export async function generateAnswer(question,video){ 
    const prompt = buildPrompt(question,video) 

    const aiResponse = await askAI(prompt) 

    return aiResponse; 
}