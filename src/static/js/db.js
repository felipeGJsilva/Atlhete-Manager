// ============================
// Banco de Dados: AthleteManager
// ============================

let db = null;

function initDB() {
    const request = indexedDB.open("AthleteManager", 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        // 1. atletas
        if (!db.objectStoreNames.contains("atletas")) {
            db.createObjectStore("atletas", { keyPath: "id", autoIncrement: true });
        }

        // 2. treinos
        if (!db.objectStoreNames.contains("treinos")) {
            let store = db.createObjectStore("treinos", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        // 3. evolucao_fisica
        if (!db.objectStoreNames.contains("evolucao_fisica")) {
            let store = db.createObjectStore("evolucao_fisica", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        // 4. avaliacoes_fisicas
        if (!db.objectStoreNames.contains("avaliacoes_fisicas")) {
            let store = db.createObjectStore("avaliacoes_fisicas", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        // 5. competicoes
        if (!db.objectStoreNames.contains("competicoes")) {
            let store = db.createObjectStore("competicoes", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        // 6. metas
        if (!db.objectStoreNames.contains("metas")) {
            let store = db.createObjectStore("metas", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        // 7. notificacoes
        if (!db.objectStoreNames.contains("notificacoes")) {
            let store = db.createObjectStore("notificacoes", { keyPath: "id", autoIncrement: true });
            store.createIndex("atleta_id", "atleta_id", { unique: false });
        }

        console.log("Banco atualizado.");
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Banco carregado com sucesso.");
    };

    request.onerror = function() {
        console.log("Erro ao abrir banco.");
    };
}

// Iniciar banco ao carregar JS
initDB();
