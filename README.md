
---

# 🏋️‍♂️ AthleteManager — Sistema de Gestão de Atletas Amadores

Gerencie treinos, evolução física, metas, competições e avaliações de atletas de qualquer modalidade.

---

## 📌 Descrição do Projeto

O **AthleteManager** é um sistema criado para facilitar a vida de atletas amadores e treinadores.
Ele permite registrar treinos, acompanhar evolução física, armazenar avaliações detalhadas, definir metas e controlar competições.
Serve para qualquer esporte: rugby, futebol, corrida, vôlei e muitos outros.

O foco do sistema é ser simples, organizado e oferecer informações úteis para evolução esportiva.

---

## 🎯 Funcionalidades Principais

### ✔️ Gestão de Atletas

* Cadastro de atletas com idade, altura, peso e modalidade.
* Histórico completo e atualizado.

### ✔️ Registro de Treinos

* Tipos de treino: força, resistência, sprint, técnico etc.
* Intensidade, duração e observações gerais.

### ✔️ Evolução Física

* Pesagens e medições ao longo do tempo.
* Percentual de gordura.
* Massa magra estimada.
* Nota geral de desempenho.

### ✔️ Avaliações Físicas

* Salto vertical.
* Sprint 10m e 40m.
* Força superior e inferior.
* Mobilidade.
* Observações do avaliador.

### ✔️ Competições

* Registro de eventos disputados.
* Resultados, tempos, pontos e estatísticas.

### ✔️ Metas Esportivas

* Criação de metas com prazo.
* Status: pendente, em andamento ou concluída.

### ✔️ Notificações (opcional)

* Alertas de treinos, metas e avaliações.

---

## 🧱 Estrutura do Banco de Dados

### **Tabelas**

* **atletas**
* **treinos**
* **evolucao_fisica**
* **avaliacoes_fisicas**
* **competicoes**
* **metas**
* **notificacoes** (opcional)

### **Relações**

* 1 atleta → vários treinos
* 1 atleta → várias evoluções
* 1 atleta → várias avaliações
* 1 atleta → várias metas
* 1 atleta → várias competições

---

## 🛠️ Tecnologias Utilizadas

* Backend: Python (Flask/FastAPI/Django) ou Node.js
* Banco: SQLite / MySQL / PostgreSQL
* Frontend: HTML, CSS, JS, Bootstrap
* Ferramentas: Git, GitHub, VS Code

---

## 📁 Estrutura de Pastas (Exemplo)

```
AthleteManager/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── docs/
│   ├── database.md
│   └── api_endpoints.md
│
├── tests/
│
├── README.md
└── requirements.txt
```

---

## 🚀 Como Rodar o Projeto (Exemplo com Python + Flask)

```bash
git clone https://github.com/seu-usuario/AthleteManager.git
cd AthleteManager

python -m venv venv

venv\Scripts\activate   # Windows
source venv/bin/activate   # Linux/Mac

pip install -r requirements.txt

python app.py
```

Acesse o sistema em:

```
http://localhost:5000
```

---

## 🧪 Testes

```bash
pytest
```

---

## 📌 Roadmap Futuro

* [ ] Exportar relatórios em PDF
* [ ] Dashboard com gráficos
* [ ] Múltiplos atletas por treinador
* [ ] Aplicativo mobile
* [ ] Integração com smartwatch

---

## 🤝 Contribuição

1. Faça um fork
2. Crie uma branch
3. Faça o commit
4. Abra um Pull Request

---

## 📄 Licença

Licença MIT — livre para modificar e distribuir.

---

## 🙋 Sobre o Projeto

Criado para ajudar atletas amadores a manterem organização e evolução constante.
Se quiser expandir o projeto, posso ajudar criando layout, diagramas, endpoints ou telas.
