export default function VideoPage({video,onBack}){
return (
    <div style={{padding:"24px"}}>
        <h1>{video.title}</h1>
        <p>Nível: {video.title}</p> 

        <p style={{marginTop:"16px"}}>
                <br />Video do Youtube 
                <br />Resumo da Técnica
                <br />Chatbot Treinador 
        </p>

        <button onClick={onBack} style={{marginTop:"20px"}}>Voltar</button>
    </div>
    ); 
}