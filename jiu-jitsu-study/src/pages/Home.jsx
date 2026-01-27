import {useState} from "react" 
import CategoryCard from "../components/CategoryCard"; 
import VideoCard from "../components/VideoCard"; 
import VideoPage from "./VideoPage"; 

export default function Home(){

// Criando estrutura de objetos 

// const categories = [
//     "Guarda", 
//     'Passagem', 
//     'Finalizações', 
//     'Defesa', 
//     'Quedas', 
// ]; 

const videosByCategory = {
 Guarda: [
        {
            id:1, 
            title:"Fundamentos da Guarda Fechada", 
            level:"Iniciante", 
            summary:"O objetivo dessa posição é quebrar a Postura do adversário, visando retenção.", 
            applyTips:"Aplique quando o usuario estiver desalinhado dentro da guarda."
        }, 
        {
            id:2, 
            title:"Fundamentos da guarda laço", 
            level:"iniciante",  
            summary:"Essa posição visa quebrar o alinhamento do oponente, facilitando para raspagens e finalizações como armbars e triangulos.", 
            applyTips:"Aplique quando estiver na aranha, visando fazer uma adptação rapida no fluxo do jogo."
        }, 
    ], 
    Passagem:[
        {
            id:3,  
            title:"Fundamentos da Passagem", 
            level:"Intermediário", 
            summary:"A passagem é um dos pilares do jiu-jitsu, sua eficacia é ainda maior quando aplicado as tecnicas corretas", 
            applyTips:"Aplique quando estiver 'toureando' o oponente para concluir a passagem"
        }, 
    ], 
    Finalizações:[
        {
            id:4,
            title:"Variações da Homoplata", 
            level:"Intermediário", 
            summary:"A homoplata permite trabalhar multiplas finalizações a partir de sua aplicação", 
            applyTips:"Aplique quando o oponente estiver resistindo a chave de braço dentro da guarda"
        }, 
    ], 
    Defesa:[
        {
            id:5, 
            title:"Defesa do Triângulo", 
            level:"Intermediário", 
            summary:"A defesa do Triângulo consiste em simular o atendimento de um telefone, com as mão na Orelha", 
            applyTips:"Aplique quando estiver tomando o triângulo dentro da guarda do oponente"
        }, 
    ], 
    Quedas:[
        {
            id:6, 
            title:"Variações do Ashi-garami",
            level:"Avançado",  
            summary:"O ashi consiste em 'varrer' a perna do oponente enquanto domina a outra", 
            applyTips:"Aplique quando dominar uma das pernas do adversario, ainda quando o combate estiver em pé"
        }, 
    ], 
    Drills:[
        {
            id:7, 
            title:"Drill de Passagem de Guarda", 
            level:"Iniciante", 
            summary:"Esse Drill muda a Eficacia da sua passagem", 
            applyTips:"Aplique quando quiser ampliar seu jogo de passagem" 
        }, 
    ], 
};
const categories = Object.keys(videosByCategory); 

const [selectedCategory,setSelectedCategory] = useState(null) 
const [selectedVideo,setSelectedVideo] = useState(null) 

function handleCategoryClick(category){
    setSelectedCategory(category); 
}
if(selectedVideo){    
return(
        <VideoPage video={selectedVideo} onBack={()=>setSelectedVideo(null)}></VideoPage>
)
}

// Função com elementos e interface do Usuario 

return(
            <div style={{padding:"40px",borderRadius:"12px", textAlign:"center", marginBottom:"40px"}}>
                <h1 style={{fontFamily:"sans-serif",marginBottom:"30px",textAlign:"left",fontSize:"2rem"}}>Estudos de Jiu-jitsu</h1>

            <div style={{display:"flex",flexDirection:"row",gap:"100px",alignItems:"center",width:"100%",maxWidth:"1000px",justifyContent:"space-evenly",margin:"10px",padding:"10px"}}>
                <div style={{display:"flex",flexDirection:"column",gap:"10px",minWidth:"200px"}}>
                    {categories.map((cat)=>(
                        <CategoryCard key={cat} name={cat} onclick={()=>handleCategoryClick(cat)}></CategoryCard>
                    ))}
                </div>

                <div style={{display:"flex",alignItems:"flex-end"}}>
                    {selectedCategory&&(
                       <div>
                        <h2>Videos de {selectedCategory}</h2> 
                        {videosByCategory[selectedCategory].map((video)=>(
                            <VideoCard key={video.id} title={video.title} level={video.level} onclick={()=>setSelectedVideo(video)}></VideoCard> 
                        ))}
                       </div>
                    )}
                    </div>
            </div>
    </div>
    )}