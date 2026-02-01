import {useState} from "react"; 
import {chatbot} from "../chatbot/chatbot";  
import CategoryCard from "../components/CategoryCard"; 
import VideoCard from "../components/VideoCard"; 
import VideoPage from "./VideoPage"; 
import {videosByCategory} from "../data/videos"
import Layout from "../components/Layout";

export default function Home(){

const categories = Object.keys(videosByCategory); 

const [selectedCategory,setSelectedCategory] = useState(null);  
const [selectedVideo,setSelectedVideo] = useState(null);  

const [chatHistory,setChatHistory] = useState([]); 
const [question,setQuestion] = useState("");  

const [loading,setLoading] = useState(false) 

async function handleAsk(video){

setLoading(true)

const response = await fetch("http://localhost:3000/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"}, 
    body:JSON.stringify({
        question,
        video 
    })
}); 

const data = await response.json() 

setChatHistory(prev=>[
    ...prev, 
    {question},
    {answer} 
]); 

setQuestion(""); 
setLoading(false) 
}


function handleCategoryClick(category){
    setSelectedCategory(category); 
}
if(selectedVideo){    
return(
        <VideoPage video={selectedVideo} question={question} setQuestion={setQuestion} chatHistory={chatHistory}  onBack={()=>setSelectedVideo(null)} onAsk={()=>handleAskChatbot(selectedVideo)} loading={loading}></VideoPage>        
    )
}

// Função com elementos e interface do Usuario 

return(
    <Layout>
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
</Layout>
    )}