import {Router} from "express"; 
import {askChatbot} from "../controllers/chat.controller"; 

const router = Router(); 

router.post("/",askChatbot); 

export default router; 