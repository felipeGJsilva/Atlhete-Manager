function init_competicoes() {
    listarCompeticoes();
}

function salvarCompeticao() {
    db.transaction("competicoes", "readwrite")
      .objectStore("competicoes")
      .add({ evento: evento.value });
}

function listarCompeticoes() {
    db.transaction("competicoes").objectStore("competicoes").getAll().onsuccess =
        e => listaCompeticoes.innerHTML =
            e.target.result.map(c => `<li>${c.evento}</li>`).join("");
}
