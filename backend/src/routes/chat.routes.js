// Importações
import {Router} from "express"; 
import {chat} from "../controllers/chat.controller.js"; 

// variavel da chamada de função
const router = Router(); 
 
// Rota para armazenar os dados
router.post("/chat",chat); 

// exportando a rota para as demais partes do programa 
export default router; 
