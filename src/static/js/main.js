console.log("AthleteManager iniciado!");

// Exemplo de salvamento simples local (pode trocar por API depois)
function salvarLocal(nomeChave, dados) {
    localStorage.setItem(nomeChave, JSON.stringify(dados));
}

function carregarLocal(nomeChave) {
    return JSON.parse(localStorage.getItem(nomeChave)) || [];
}
