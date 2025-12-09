console.log("✅ AthleteManager iniciado com sucesso");

/* ===============================
   FUNÇÕES DE LOCAL STORAGE
================================ */

function salvarLocal(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarLocal(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

/* ===============================
   DADOS INICIAIS (SE VAZIO)
================================ */

function iniciarDados() {
    if (carregarLocal("atletas").length === 0) {
        salvarLocal("atletas", [
            { nome: "João Silva" },
            { nome: "Pedro Santos" },
            { nome: "Lucas Rocha" }
        ]);
    }

    if (carregarLocal("treinos").length === 0) {
        salvarLocal("treinos", [
            { data: "2025-03-10" },
            { data: "2025-03-10" }
        ]);
    }

    if (carregarLocal("avaliacoes").length === 0) {
        salvarLocal("avaliacoes", [
            { tipo: "Física" },
            { tipo: "Resistência" },
            { tipo: "Velocidade" }
        ]);
    }

    if (carregarLocal("competicoes").length === 0) {
        salvarLocal("competicoes", [
            { nome: "Regional Rugby" }
        ]);
    }

    if (carregarLocal("metas").length === 0) {
        salvarLocal("metas", [
            { descricao: "Aumentar força" },
            { descricao: "Melhorar resistência" }
        ]);
    }
}

/* ===============================
   ATUALIZAR CARDS DO DASHBOARD
================================ */

function atualizarDashboard() {
    const atletas = carregarLocal("atletas").length;
    const treinos = carregarLocal("treinos").length;
    const avaliacoes = carregarLocal("avaliacoes").length;
    const competicoes = carregarLocal("competicoes").length;
    const metas = carregarLocal("metas").length;

    // Só atualiza se os elementos existirem
    if (document.getElementById("qtd-atletas")) {
        document.getElementById("qtd-atletas").innerText = atletas;
    }

    if (document.getElementById("qtd-treinos")) {
        document.getElementById("qtd-treinos").innerText = treinos;
    }

    if (document.getElementById("qtd-avaliacoes")) {
        document.getElementById("qtd-avaliacoes").innerText = avaliacoes;
    }

    if (document.getElementById("qtd-competicoes")) {
        document.getElementById("qtd-competicoes").innerText = competicoes;
    }

    if (document.getElementById("qtd-metas")) {
        document.getElementById("qtd-metas").innerText = metas;
    }
}

/* ===============================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", () => {
    iniciarDados();
    atualizarDashboard();
});
