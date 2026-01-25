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

// Função com elementos e interface do Usuario 
return(
        <div style={{display:"flex", flexDirection:"column", padding:"40px 20px", justifyContent:"center",alignItems:"center",minHeight:"100vh", }}>
            <div style={{padding:"40px",borderRadius:"12px", textAlign:"center", marginBottom:"100%"}}>
                <h1 style={{fontFamily:"sans-serif",marginBottom:"30px",textAlign:"left",fontSize:"2rem"}}>Estudos de Jiu-jitsu</h1>
                <div style={{display:"flex",gap:"12px",marginTop:"5px", flexDirection:"column",justifyContent:"center",alignItems:"flex-start",fontFamily:"sans-serif",fontWeight:"bolder",flexWrap:"nowrap",maxWidth:"800px"}}>
                    {categories.map((cat)=>(
                        <button key={cat}>{cat}</button>
                    ))}
                </div>
            </div>
    </div>
); 
}
