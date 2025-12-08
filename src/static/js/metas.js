function init_metas() {
    listarMetas();
}

function salvarMeta() {
    db.transaction("metas", "readwrite")
      .objectStore("metas")
      .add({ titulo: titulo.value });
}

function listarMetas() {
    db.transaction("metas").objectStore("metas").getAll().onsuccess =
        e => listaMetas.innerHTML =
            e.target.result.map(m => `<li>${m.titulo}</li>`).join("");
}
