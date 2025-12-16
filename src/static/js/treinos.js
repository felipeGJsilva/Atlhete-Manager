document.addEventListener('DOMContentLoaded', () => {
    carregarTreinos();
});

// FUNÇÃO ADICIONAR
document.getElementById("formAddTreino").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const tipo = form.tipo.value;

    try {
        const response = await fetch('/api/treinos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo })
        });
        if (response.ok) {
            form.reset();
            carregarTreinos();
            bootstrap.Modal.getInstance(document.getElementById("modalAddTreino")).hide();
        }
    } catch (error) {
        console.error('Erro ao adicionar treino:', error);
    }
};

// FUNÇÃO EDITAR
document.getElementById("formEditTreino").onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const tipo = form.tipo.value;

    try {
        const response = await fetch(`/api/treinos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo })
        });
        if (response.ok) {
            carregarTreinos();
            bootstrap.Modal.getInstance(document.getElementById("modalEditTreino")).hide();
        }
    } catch (error) {
        console.error('Erro ao editar treino:', error);
    }
};

// CARREGAR TREINOS
async function carregarTreinos() {
    try {
        const response = await fetch('/api/treinos');
        const treinos = await response.json();
        const lista = document.getElementById("lista-treinos");
        lista.innerHTML = treinos.map(t => `
            <div class="dash-card">
                <div class="atleta-info">
                    <h4>${t.tipo}</h4>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" onclick='editarTreino(${t.id})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirTreino(${t.id})'>Excluir</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar treinos:', error);
    }
}

// EDITAR TREINO
async function editarTreino(id) {
    try {
        const response = await fetch(`/api/treinos/${id}`);
        const t = await response.json();
        const form = document.getElementById("formEditTreino");

        form.id.value = t.id;
        form.tipo.value = t.tipo;

        new bootstrap.Modal(document.getElementById("modalEditTreino")).show();
    } catch (error) {
        console.error('Erro ao carregar treino para edição:', error);
    }
}

// EXCLUIR TREINO
async function excluirTreino(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const response = await fetch(`/api/treinos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarTreinos();
        }
    } catch (error) {
        console.error('Erro ao excluir treino:', error);
    }
}
