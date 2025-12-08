function init_atletas() {
    listarAtletas();
}

function salvarAtleta() {
    const tx = db.transaction("atletas", "readwrite");
    tx.objectStore("atletas").add({
        nome: nome.value,
        modalidade: modalidade.value
    });
    tx.oncomplete = listarAtletas;
}

function listarAtletas() {
    const req = db.transaction("atletas").objectStore("atletas").getAll();
    req.onsuccess = () => {
        listaAtletas.innerHTML = "";
        req.result.forEach(a =>
            listaAtletas.innerHTML += `<li>${a.nome} - ${a.modalidade}</li>`
        );
    };
}
