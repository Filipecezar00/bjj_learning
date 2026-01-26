import {useState} from "react" 
import CategoryCard from "../components/CategoryCard"; 

export default function Home(){

// Criando estrutura de objetos 

const categories = [
    "Guarda", 
    'Passagem', 
    'Finalizações', 
    'Defesa', 
    'Quedas', 
]; 

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
            title:"Variações do oshi-garami",
            level:"Avançado" 
        }, 
    ], 
};


const [selectedCategory,setSelectedCategory] = useState(null) 

function handleCategoryClick(category){
    console.log("Categoria Clicada:", category);  
    setSelectedCategory(category); 

}

// Função com elementos e interface do Usuario 
return(
        <div style={{display:"flex", flexDirection:"column", padding:"40px 20px", justifyContent:"center",alignItems:"center",minHeight:"100vh", }}>
            <div style={{padding:"40px",borderRadius:"12px", textAlign:"center", marginBottom:"100%"}}>
                <h1 style={{fontFamily:"sans-serif",marginBottom:"30px",textAlign:"left",fontSize:"2rem"}}>Estudos de Jiu-jitsu</h1>
                <div style={{display:"flex",gap:"12px",marginTop:"5px", flexDirection:"column",justifyContent:"center",alignItems:"flex-start",fontFamily:"sans-serif",fontWeight:"bolder",flexWrap:"nowrap",maxWidth:"800px"}}>
                    {categories.map((cat)=>(
                        <CategoryCard key={cat} name={cat} onclick={()=>handleCategoryClick(cat)}></CategoryCard>
                    ))}
                </div>
                    {selectedCategory&&(
                        <p style={{marginTop:"20px"}}>
                            Categoria Selecionada: <strong>{selectedCategory}</strong>
                        </p>
                    )}
            </div>
    </div>
); 
}
