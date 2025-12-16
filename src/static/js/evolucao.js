document.addEventListener('DOMContentLoaded', () => {
    carregarEvolucao();
});

// FUNÇÃO ADICIONAR
document.getElementById("formAddEvolucao").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const peso = parseFloat(form.peso.value);

    try {
        const response = await fetch('/api/evolucao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ peso })
        });
        if (response.ok) {
            form.reset();
            carregarEvolucao();
            bootstrap.Modal.getInstance(document.getElementById("modalAddEvolucao")).hide();
        }
    } catch (error) {
        console.error('Erro ao adicionar evolução:', error);
    }
};

// FUNÇÃO EDITAR
document.getElementById("formEditEvolucao").onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const peso = parseFloat(form.peso.value);

    try {
        const response = await fetch(`/api/evolucao/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ peso })
        });
        if (response.ok) {
            carregarEvolucao();
            bootstrap.Modal.getInstance(document.getElementById("modalEditEvolucao")).hide();
        }
    } catch (error) {
        console.error('Erro ao editar evolução:', error);
    }
};

// CARREGAR EVOLUÇÃO
async function carregarEvolucao() {
    try {
        const response = await fetch('/api/evolucao');
        const evolucoes = await response.json();
        const lista = document.getElementById("lista-evolucao");
        lista.innerHTML = evolucoes.map(e => `
            <div class="dash-card">
                <div class="atleta-info">
                    <h4>${e.peso} kg</h4>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" onclick='editarEvolucao(${e.id})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirEvolucao(${e.id})'>Excluir</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar evoluções:', error);
    }
}

// EDITAR EVOLUÇÃO
async function editarEvolucao(id) {
    try {
        const response = await fetch(`/api/evolucao/${id}`);
        const e = await response.json();
        const form = document.getElementById("formEditEvolucao");

        form.id.value = e.id;
        form.peso.value = e.peso;

        new bootstrap.Modal(document.getElementById("modalEditEvolucao")).show();
    } catch (error) {
        console.error('Erro ao carregar evolução para edição:', error);
    }
}

// EXCLUIR EVOLUÇÃO
async function excluirEvolucao(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const response = await fetch(`/api/evolucao/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarEvolucao();
        }
    } catch (error) {
        console.error('Erro ao excluir evolução:', error);
    }
}
