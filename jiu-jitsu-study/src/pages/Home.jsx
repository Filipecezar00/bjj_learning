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
    <div style={{padding:24}}>
        <h1>Estudos de Jiu-jitsu</h1> 
        <div style={{display:"flex",gap:16,marginTop:20}}>
            {categories.map((cat)=>(
                <button key={cat}>{cat}</button>
            ))}
        </div>
    </div>
); 
}
