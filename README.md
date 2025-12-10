# AthleteManager

AthleteManager é um sistema web voltado ao **gerenciamento, acompanhamento e análise de atletas**, permitindo o registro estruturado de dados pessoais, esportivos e físicos, além do monitoramento contínuo da evolução de desempenho ao longo do tempo.

O projeto foi concebido com foco em **organização, escalabilidade e clareza técnica**, possibilitando evolução gradual do front-end para uma aplicação completa integrada a uma API REST e banco de dados persistente.

---

## Objetivo do Sistema

Centralizar informações de atletas em um único ambiente, oferecendo:
- Controle estruturado de dados individuais
- Histórico de evolução física
- Facilidade de manutenção e expansão
- Base sólida para análises futuras de desempenho

---

## Estado Atual do Projeto

O projeto encontra-se na fase de **prototipação do front-end**, com definição clara de:
- Estrutura de telas
- Padrão visual
- Organização de arquivos
- Modelagem de dados
- Planejamento de endpoints da API

A camada de backend será integrada em etapas posteriores.

---

## Funcionalidades

### Implementadas
- Dashboard inicial
- Página de atletas (protótipo)
- Layout baseado em cards
- Tema visual consistente
- Estrutura modular de arquivos
- Base de scripts JavaScript
- Design responsivo

### Planejadas
- Cadastro completo de atletas
- Tela de detalhes do atleta
- Modal para edição de dados
- Upload de foto do atleta
- Registro de evolução física (peso, IMC, força)
- API REST
- Persistência em banco de dados
- Autenticação e controle de acesso

---

## Estrutura do Projeto

Athlete-Manager/
│
├── index.html # Dashboard principal
├── atleta.html # Tela de atletas (protótipo)
│
├── assets/
│ ├── css/
│ │ └── style.css # Estilos globais
│ ├── js/
│ │ └── main.js # Scripts base (estrutura inicial)
│ └── images/
│
├── docs/
│ ├── database.md # Modelagem e documentação do banco de dados
│ └── api_endpoints.md # Especificação dos endpoints da API
│
└── README.md


---

## Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5

### Planejamento de Back-end
- Python (Flask ou FastAPI)
- API REST
- Banco de dados relacional (PostgreSQL ou SQLite)
- Sistema de upload de arquivos
- Autenticação baseada em tokens

---

## Modelo de Dados

O sistema é baseado nas seguintes entidades principais:
- **Athletes**: dados pessoais e esportivos
- **Physical Evolution**: histórico de métricas físicas

A modelagem foi pensada para manter histórico, integridade de dados e permitir fácil expansão.

---

## Documentação Técnica

A documentação técnica detalhada está disponível na pasta `/docs`:

- **database.md** — Estrutura e relacionamentos do banco de dados
- **api_endpoints.md** — Definição dos endpoints REST planejados

Esses documentos representam o estado atual do planejamento técnico do sistema.

---

## Roadmap (Alto Nível)

1. Finalização do front-end
2. Implementação da API REST
3. Persistência de dados
4. Upload de imagens
5. Evolução física e relatórios
6. Autenticação e segurança

---

## Licença

Este projeto está licenciado sob a licença MIT.
