import {GoogleGenerativeAI} from "@google/generative-ai"; 
import dotenv from "dotenv"; 
dotenv.config() ; 

console.log("KEY:",process.env.GEMINI_API_KEY); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({model:"gemini-1.0-pro"}); 

const result = await model.generateContent('Explique o arm-lock no jiu-jitsu'); 
console.log(result.response.text()); 

