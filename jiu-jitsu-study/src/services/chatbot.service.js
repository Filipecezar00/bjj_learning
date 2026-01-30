export function chatbotService(question,video){

    if(question.toLowerCase().includes("Quando")) return `Aplique a tecnica ${video.title} quando ${video.applyTips.toLowerCase()}.` 

    if(question.toLowerCase().includes("nivel")) return `Essa técnica é recomendada para o nivel ${video.level}.`

    return `Treine todos os Detalhes` 

}