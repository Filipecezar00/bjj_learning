import {useState} from "react" 
import CategoryCard from "../components/CategoryCard"; 
import VideoCard from "../components/VideoCard"; 

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
        }, 
        {
            id:2, 
            title:"Fundamentos da guarda laço", 
            level:"iniciante",  
        }, 
    ], 
    Passagem:[
        {
            id:3,  
            title:"Fundamentos da Passagem", 
            level:"Intermediário", 
        }, 
    ], 
    Finalizações:[
        {
            id:4,
            title:"Variações da Homoplata", 
            level:"Intermediário", 
        }, 
    ], 
    Defesa:[
        {
            id:5, 
            title:"Defesa do Triângulo", 
            level:"Intermediário", 
        }, 
    ], 
    Quedas:[
        {
            id:6, 
            title:"Variações do Ashi-garami",
            level:"Avançado" 
        }, 
    ], 
};
const categories = Object.keys(videosByCategory); 

const [selectedCategory,setSelectedCategory] = useState(null) 

function handleCategoryClick(category){
    setSelectedCategory(category); 

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
                            <VideoCard key={video.id} title={video.title} level={video.level}></VideoCard>
                        ))}
                       </div>
                    )}
                    </div>
            </div>
    </div>
); 
}
