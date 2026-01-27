export default function VideoPage({video,onBack}){
return (
    <div style={{padding:"24px"}}>
        <h1>{video.title}</h1>
        <p>Nível: {video.title}</p> 

        <p style={{marginTop:"16px"}}>
                <br />Video do Youtube  <br />
                <br /><strong>Resumo da técnica: {video.summary}</strong> <br />
                <br /><strong>Quando aplicar: {video.applyTips} </strong> <br />
                <br />Chatbot Treinador 
        </p>

        <button onClick={onBack} style={{marginTop:"20px"}}>Voltar para as Categorias</button>
    </div>
    ); 
}