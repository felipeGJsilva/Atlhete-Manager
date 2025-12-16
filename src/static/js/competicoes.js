document.addEventListener('DOMContentLoaded', () => {
    carregarCompeticoes();
});

// FUNÇÃO ADICIONAR
document.getElementById("formAddCompeticao").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const evento = form.evento.value;

    try {
        const response = await fetch('/api/competicoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ evento })
        });
        if (response.ok) {
            form.reset();
            carregarCompeticoes();
            bootstrap.Modal.getInstance(document.getElementById("modalAddCompeticao")).hide();
        }
    } catch (error) {
        console.error('Erro ao adicionar competição:', error);
    }
};

// FUNÇÃO EDITAR
document.getElementById("formEditCompeticao").onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const evento = form.evento.value;

    try {
        const response = await fetch(`/api/competicoes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ evento })
        });
        if (response.ok) {
            carregarCompeticoes();
            bootstrap.Modal.getInstance(document.getElementById("modalEditCompeticao")).hide();
        }
    } catch (error) {
        console.error('Erro ao editar competição:', error);
    }
};

// CARREGAR COMPETIÇÕES
async function carregarCompeticoes() {
    try {
        const response = await fetch('/api/competicoes');
        const competicoes = await response.json();
        const lista = document.getElementById("lista-competicoes");
        lista.innerHTML = competicoes.map(c => `
            <div class="dash-card">
                <div class="atleta-info">
                    <h4>${c.evento}</h4>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" onclick='editarCompeticao(${c.id})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirCompeticao(${c.id})'>Excluir</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar competições:', error);
    }
}

// EDITAR COMPETIÇÃO
async function editarCompeticao(id) {
    try {
        const response = await fetch(`/api/competicoes/${id}`);
        const c = await response.json();
        const form = document.getElementById("formEditCompeticao");

        form.id.value = c.id;
        form.evento.value = c.evento;

        new bootstrap.Modal(document.getElementById("modalEditCompeticao")).show();
    } catch (error) {
        console.error('Erro ao carregar competição para edição:', error);
    }
}

// EXCLUIR COMPETIÇÃO
async function excluirCompeticao(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const response = await fetch(`/api/competicoes/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarCompeticoes();
        }
    } catch (error) {
        console.error('Erro ao excluir competição:', error);
    }
}
