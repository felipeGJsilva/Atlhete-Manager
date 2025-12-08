function init_evolucao() { listarEvolucao(); }

function salvarEvolucao() {
    db.transaction("evolucao", "readwrite")
      .objectStore("evolucao")
      .add({ peso: peso.value });
}

function listarEvolucao() {
    db.transaction("evolucao").objectStore("evolucao").getAll().onsuccess =
        e => listaEvolucao.innerHTML =
            e.target.result.map(r => `<li>${r.peso} kg</li>`).join("");
}
