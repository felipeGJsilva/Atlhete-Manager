// ======================
// INICIALIZAÇÃO DO BANCO
// ======================
let db;
const request = indexedDB.open("AthleteManager", 1);

request.onupgradeneeded = e => {
    db = e.target.result;

    if (!db.objectStoreNames.contains("atletas")) {
        db.createObjectStore("atletas", { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = e => {
    db = e.target.result;
    carregarAtletas();
};

// ======================
// FUNÇÃO ADICIONAR
// ======================
document.getElementById("formAddAtleta").onsubmit = async e => {
    e.preventDefault();

    const form = e.target;

    let foto = await carregarImagem(document.getElementById("fotoAdd").files[0]);

    const atleta = {
        nome: form.nome.value,
        esporte: form.esporte.value,
        posicao: form.posicao.value,
        idade: form.idade.value,
        altura: form.altura.value,
        peso: form.peso.value,
        foto: foto || "default"
    };

    const tx = db.transaction("atletas", "readwrite");
    tx.objectStore("atletas").add(atleta);

    tx.oncomplete = () => {
        form.reset();
        carregarAtletas();
        bootstrap.Modal.getInstance(document.getElementById("modalAddAtleta")).hide();
    };
};

// ======================
// FUNÇÃO EDITAR
// ======================
document.getElementById("formEditAtleta").onsubmit = async e => {
    e.preventDefault();
    const form = e.target;

    let novaFoto = document.getElementById("fotoEdit").files[0];
    let fotoConvertida = novaFoto ? await carregarImagem(novaFoto) : null;

    const atleta = {
        id: Number(form.id.value),
        nome: form.nome.value,
        esporte: form.esporte.value,
        posicao: form.posicao.value,
        idade: form.idade.value,
        altura: form.altura.value,
        peso: form.peso.value,
        foto: fotoConvertida || form.getAttribute("data-foto-original")
    };

    const tx = db.transaction("atletas", "readwrite");
    tx.objectStore("atletas").put(atleta);

    tx.oncomplete = () => {
        carregarAtletas();
        bootstrap.Modal.getInstance(document.getElementById("modalEditAtleta")).hide();
    };
};

// ======================
// CARREGAR ATLETAS
// ======================
function carregarAtletas() {
    const lista = document.getElementById("lista-atletas");
    lista.innerHTML = "";

    const tx = db.transaction("atletas", "readonly");
    const store = tx.objectStore("atletas");

    store.openCursor().onsuccess = e => {
        const cursor = e.target.result;
        if (!cursor) return;

        const a = cursor.value;

        lista.innerHTML += `
            <div class="dash-card">
                <img src="${a.foto === "default" ? "../../static/img/default-user.png" : a.foto}" class="atleta-foto">
                <div class="atleta-info">
                    <h4>${a.nome}</h4>
                    <p><strong>Esporte:</strong> ${a.esporte}</p>
                    <p><strong>Posição/Prova:</strong> ${a.posicao}</p>
                    <p><strong>Idade:</strong> ${a.idade} anos</p>
                    <p><strong>Altura:</strong> ${a.altura} m</p>
                    <p><strong>Peso:</strong> ${a.peso} kg</p>

                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" onclick='editarAtleta(${a.id})'>Editar</button>
                        <button class="btn btn-sm btn-danger" onclick='excluirAtleta(${a.id})'>Excluir</button>
                    </div>
                </div>
            </div>
        `;

        cursor.continue();
    };
}

// ======================
// FUNÇÕES EXTRA
// ======================
async function carregarImagem(file) {
    if (!file) return null;

    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function editarAtleta(id) {
    const tx = db.transaction("atletas", "readonly");
    tx.objectStore("atletas").get(id).onsuccess = e => {
        const a = e.target.result;
        const form = document.getElementById("formEditAtleta");

        form.id.value = a.id;
        form.nome.value = a.nome;
        form.esporte.value = a.esporte;
        form.posicao.value = a.posicao;
        form.idade.value = a.idade;
        form.altura.value = a.altura;
        form.peso.value = a.peso;

        form.setAttribute("data-foto-original", a.foto);

        new bootstrap.Modal(document.getElementById("modalEditAtleta")).show();
    };
}

function excluirAtleta(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    const tx = db.transaction("atletas", "readwrite");
    tx.objectStore("atletas").delete(id);

    tx.oncomplete = () => carregarAtletas();
}
