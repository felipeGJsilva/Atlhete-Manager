function init_avaliacoes() {
    listarAvaliacoes();
}

function salvarAvaliacao() {
    db.transaction("avaliacoes", "readwrite")
      .objectStore("avaliacoes")
      .add({ forca: forca.value });
}

function listarAvaliacoes() {
    db.transaction("avaliacoes").objectStore("avaliacoes").getAll().onsuccess =
        e => listaAvaliacoes.innerHTML =
            e.target.result.map(a => `<li>${a.forca}</li>`).join("");
}
