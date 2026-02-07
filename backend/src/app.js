import express from "express"; 
import cors from "cors"; 
import chatRoutes from "./routes/chat.routes.js"; 
import errorMiddleware from "./middlawares/errorMiddleware.js"; 

const app = express() 

app.use(cors()); 
app.use(express.json()) 

app.use("/chatbot",chatRoutes); 

app.use(errorMiddleware) 

export default app; 
