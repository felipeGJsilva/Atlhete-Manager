document.addEventListener('DOMContentLoaded', () => {
    carregarMetas();
});

// FUNÇÃO ADICIONAR
document.getElementById("formAddMeta").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const titulo = form.titulo.value;

    try {
        const response = await fetch('/api/metas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });
        if (response.ok) {
            form.reset();
            carregarMetas();
            bootstrap.Modal.getInstance(document.getElementById("modalAddMeta")).hide();
        }
    } catch (error) {
        console.error('Erro ao adicionar meta:', error);
    }
};

// FUNÇÃO EDITAR
document.getElementById("formEditMeta").onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const titulo = form.titulo.value;

    try {
        const response = await fetch(`/api/metas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });
        if (response.ok) {
            carregarMetas();
            bootstrap.Modal.getInstance(document.getElementById("modalEditMeta")).hide();
        }
    } catch (error) {
        console.error('Erro ao editar meta:', error);
    }
};

// CARREGAR METAS
async function carregarMetas() {
    try {
        const response = await fetch('/api/metas');
        const metas = await response.json();
        const lista = document.getElementById("lista-metas");
        lista.innerHTML = metas.map(m => `
            <div class="dash-card">
                <div class="atleta-info">
                    <h4>${m.titulo}</h4>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" onclick='editarMeta(${m.id})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirMeta(${m.id})'>Excluir</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar metas:', error);
    }
}

// EDITAR META
async function editarMeta(id) {
    try {
        const response = await fetch(`/api/metas/${id}`);
        const m = await response.json();
        const form = document.getElementById("formEditMeta");

        form.id.value = m.id;
        form.titulo.value = m.titulo;

        new bootstrap.Modal(document.getElementById("modalEditMeta")).show();
    } catch (error) {
        console.error('Erro ao carregar meta para edição:', error);
    }
}

// EXCLUIR META
async function excluirMeta(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const response = await fetch(`/api/metas/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarMetas();
        }
    } catch (error) {
        console.error('Erro ao excluir meta:', error);
    }
}