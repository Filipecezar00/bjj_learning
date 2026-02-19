export function errorMiddleware(err,req,res,next){
    console.log(err); 
    return res.status(500).json({
        error:"Erro interno no servidor"
    }); 
}