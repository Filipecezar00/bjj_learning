export default function VideoCard({title,level,onclick}){
    return(
           <div onClick={onclick} style={{border:"1px solid #ffffff",padding:"12px",borderRadius:"6px",marginBottom:"8px", cursor:"pointer"}}>
                <h4>{title}</h4>
                <small>Nível: {level}</small>
       </div>
    ); 
}



