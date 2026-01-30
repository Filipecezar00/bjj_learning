export function chatbot(question,video){
    if(!question || !video) return "Não entendi a sua pergunta" 

    const perguntas = question.toLowerCase() 

    if(perguntas.includes("quando")) return `${Array.isArray(video.applyTips)?video.applyTips.join(", "): video.applyTips}`; 
    
    if(perguntas.includes("resumo")) return video.summary 

    if(perguntas.includes("nivel")) return `Essa técnica é indicada para pessoas do nível ${video.level}` 

    return "Busque aplicar essa técnica no timing correto, visando um melhor aprendizado!"

}