import User from "../models/User.js"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import { z } from "zod"; 

const registerSchema= z.object({
    name: z.string().min(2),
    email:z.string().email(),
    password: z.string().min(6) 
}); 

export async function register(req,res){
console.log("DADOS RECEBIDOS NO FRONT:",req.body);  
try{
    const parsed = registerSchema.safeParse(req.body); 

    if(!parsed.success){
        return res.status(400).json({error:parsed.error.errors});
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({error:"Email já cadastrado"}); 
    }

    const hashedPassword = await bcrypt.hash(password,10); 

    const user = await User.create({
        name,
        email,
        password:hashedPassword 
    });
    res.status(201).json({message:"Usuário criado com Sucesso"}); 
}
catch(err){
    res.status(500).json({err:"Erro no Servidor"}); 
    }
}

export async function login(req,res){
    try{
        const {email,password} = req.body; 

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error:"Credenciais inválidas"}); 
        }

        const isMatch = await bcrypt.compare(password,user.password); 

        if(!isMatch){
            return res.status(400).json({error:"Credenciais inválidas"}) 
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET, 
            {expiresIn:"1d"} 
        ); 

        res.json({token}); 

    }catch(error){
        res.status(500).json({error:"Erro no Servidor"}); 
    }
}