import User from "../models/User.js"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

export async function register(req,res){
try{
    const {name,email,password} = req.body 
    if(!name || !email || !password){
        return res.status(400).json({error:"Preencha todos os Campos"}); 
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