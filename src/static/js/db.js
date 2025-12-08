let db;

const request = indexedDB.open("AthleteManager", 1);

request.onupgradeneeded = e => {
    db = e.target.result;

    [
        "atletas",
        "treinos",
        "evolucao",
        "avaliacoes",
        "competicoes",
        "metas"
    ].forEach(nome => {
        if (!db.objectStoreNames.contains(nome)) {
            db.createObjectStore(nome, { keyPath: "id", autoIncrement: true });
        }
    });
};

request.onsuccess = e => db = e.target.result;
