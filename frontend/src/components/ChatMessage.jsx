export default function ChatMessage({type,text}){
    return(
        <div style={{background:type==='user' ? "#eee" : "#e6f4ea",padding:"12px",borderRadius:"8px",marginBottom:"8px",maxWidth:"70%"}}>
            {type==='user'?"Você":"Treinador"} : <p>{text}</p> 
        </div>
    ); 
}