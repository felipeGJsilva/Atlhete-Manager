function init_treinos() {
    listarTreinos();
}

function salvarTreino() {
    const tx = db.transaction("treinos", "readwrite");
    tx.objectStore("treinos").add({ tipo: tipoTreino.value });
    tx.oncomplete = listarTreinos;
}

function listarTreinos() {
    const req = db.transaction("treinos").objectStore("treinos").getAll();
    req.onsuccess = () => {
        listaTreinos.innerHTML = req.result.map(t => `<li>${t.tipo}</li>`).join("");
    };
}
