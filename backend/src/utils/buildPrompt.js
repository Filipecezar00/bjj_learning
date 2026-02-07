export function buildPrompt(question,video){
    return `
    Técnica: ${video.title} \n
    Resumo: ${video.summary} \n
    Pergunta do Aluno: ${question} \n 
    Quando Aplicar ${Array.isArray(video.applyTips) ? video.applyTips.join(", ") : video.applyTips} 
    `
}