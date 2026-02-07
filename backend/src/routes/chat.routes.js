// Importações
import {Router} from "express"; 
import {askChatbot} from "../controllers/chat.controller.js"; 

// variavel da chamada de função
const router = Router(); 
 


// Rota para armazenar os dados
router.post("/",askChatbot); 

// exportando a rota para as demais partes do programa 
export default router; 
