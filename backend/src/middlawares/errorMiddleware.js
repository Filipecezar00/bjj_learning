export default function errorMiddleware(err,req,res,next){
    console.log("Erro durante a execução do servidor") 

    res.status(500).json({
        sucess: false, 
        error: "Erro do Servidor"
    }); 
}