# 🗄️ Database Documentation — AthleteManager

## Visão Geral

O banco de dados do **AthleteManager** foi projetado para armazenar informações relacionadas a atletas, suas características físicas, desempenho esportivo e evolução ao longo do tempo.

A modelagem foi pensada para permitir **crescimento gradual do sistema**, mantendo normalização, integridade e facilidade de integração com a API REST.

---

## 🎯 Objetivos do Banco de Dados

- Armazenar dados cadastrais dos atletas
- Registrar informações esportivas
- Controlar evolução física
- Permitir histórico de medições
- Garantir escalabilidade e organização

---

## 🧩 Entidades Principais

### 🧑 Atleta (`athletes`)

Armazena os dados principais de cada atleta.

| Campo           | Tipo        | Descrição |
|-----------------|-------------|-----------|
| id              | UUID / INT  | Identificador único |
| nome            | VARCHAR     | Nome completo |
| esporte         | VARCHAR     | Modalidade esportiva |
| posicao         | VARCHAR     | Posição no esporte |
| altura          | FLOAT       | Altura (m) |
| peso_atual      | FLOAT       | Peso atual (kg) |
| data_nascimento | DATE        | Data de nascimento |
| foto_url        | TEXT        | Caminho/URL da foto |
| criado_em       | TIMESTAMP   | Data de criação |
| atualizado_em   | TIMESTAMP   | Última atualização |

---

### 📊 Evolução Física (`physical_evolution`)

Registra métricas de desempenho e evolução corporal.

| Campo        | Tipo        | Descrição |
|--------------|-------------|-----------|
| id           | UUID / INT  | Identificador único |
| atleta_id    | FK          | Relacionamento com atleta |
| peso         | FLOAT       | Peso registrado |
| imc          | FLOAT       | Índice de massa corporal |
| forca        | FLOAT       | Medida de força |
| data_medicao | DATE        | Data do registro |

🔗 Relacionamento: **Atleta 1:N Evolução Física**

---

### 🏆 Competições (`competitions`) *(planejada)*

| Campo      | Tipo        | Descrição |
|------------|-------------|-----------|
| id         | UUID / INT  | Identificador |
| nome       | VARCHAR     | Nome da competição |
| modalidade | VARCHAR     | Modalidade |
| data       | DATE        | Data da competição |
| local      | VARCHAR     | Local |

---

### 🎯 Metas (`goals`) *(planejada)*

| Campo     | Tipo       | Descrição |
|-----------|------------|-----------|
| id        | UUID / INT | Identificador |
| atleta_id | FK         | Atleta relacionado |
| descricao | TEXT       | Descrição da meta |
| status    | VARCHAR    | Ativa / Concluída |
| prazo     | DATE       | Data limite |

---

## 🔗 Diagrama Conceitual (Resumo)

