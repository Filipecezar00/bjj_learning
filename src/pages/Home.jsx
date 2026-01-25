// Criando importações da página 
import{Card,CardContent} from "@/components/ui/card"; 
import {Button} from "@/components/ui/button"; 

// Criando estrutura de objetos 
const categories = [
    {id:1,name:"Guardas"}, 
    {id:2,name:"Passagens"}, 
    {id:3,name:"Finalizações"}, 
    {id:4,name:"Defesas"}, 
    {id:5,name:"Quedas"} 
]

export default function Home(){
return(
<div className="min-h-screen bg-gray-100 p-6">
<h1 className="text-3xl font-bold mb-6 text-center">Estudos de Jiu-Jitsu</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
 {categories.map((cat)=>(
    <Card key={cat.id} className="hover:shadow-lg transition">
        <CardContent className="p-6 flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <Button>Ver Videos</Button>
        </CardContent>
    </Card>
        ))}
    </div> 
</div>
    ); 
}