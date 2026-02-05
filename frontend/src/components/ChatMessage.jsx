export default function ChatMessage({type,text}){
    return(
        <div style={{background:type==='user' ? "#696969" : "#696969",padding:"12px",borderRadius:"8px",marginBottom:"8px",maxWidth:"70%"}}>
            {type==='user'?"Você":"Treinador"} : <p>{text}</p> 
        </div>
    ); 
}