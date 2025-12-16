function init_avaliacoes() {
    listarAvaliacoes();
}

async function salvarAvaliacao() {
    const forca = document.getElementById('forca').value;
    if (!forca) return;

    try {
        const response = await fetch('/api/avaliacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ forca: parseFloat(forca) })
        });
        if (response.ok) {
            document.getElementById('forca').value = '';
            listarAvaliacoes();
        }
    } catch (error) {
        console.error('Erro ao salvar avaliação:', error);
    }
}

async function listarAvaliacoes() {
    try {
        const response = await fetch('/api/avaliacoes');
        const avaliacoes = await response.json();
        const lista = document.getElementById('listaAvaliacoes');
        lista.innerHTML = avaliacoes.map(a => `<li>${a.forca}</li>`).join("");
    } catch (error) {
        console.error('Erro ao listar avaliações:', error);
    }
}
