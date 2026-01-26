export default function VideoCard({title,level}){
    return(
           <div style={{border:"1px solid #ffffff",padding:"12px",borderRadius:"6px",marginBottom:"8px",}}>
                <h4>{title}</h4>
                <small>Nível: {level}</small>
       </div>
    ); 
}



