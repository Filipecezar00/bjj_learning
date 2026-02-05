import {buildPrompt} from "../utils/buildPrompt"; 

export function generateAnswer(question,video){
    const prompt = buildPrompt(question,video); 

    //*********************************************
    // Espaço para a IA ou banco de dados 
    //*********************************************
    
    return prompt
}