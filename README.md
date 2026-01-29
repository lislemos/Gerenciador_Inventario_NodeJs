# 📦 Gerenciador de Inventário — Backend (MVP)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![REST API](https://img.shields.io/badge/API-RESTful-blueviolet)
![Deploy](https://img.shields.io/badge/Deploy-Render-success)
![Database](https://img.shields.io/badge/Database-Aiven-blue)
![Status](https://img.shields.io/badge/Status-MVP-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Sistema de **gerenciamento de inventário** desenvolvido com foco em **Backend**, seguindo princípios de **API REST**, autenticação segura e persistência de dados em **banco de dados na nuvem**.

> 🚧 **Este projeto é um MVP (Minimum Viable Product)**  
> Desenvolvido como **Projeto Pessoal**, com foco em estudos voltados ao Node.Js e boas práticas de backend.

---

## 🎯 Objetivo do Projeto

O objetivo deste projeto é demonstrar competências em **desenvolvimento backend**, incluindo:

- Construção de **API RESTful**
- Autenticação e autorização com **JWT**
- Integração com **banco de dados MySQL em nuvem**
- Organização de código baseada em **controllers, routes e middlewares**
- Boas práticas de configuração e segurança

O frontend existe apenas como **camada de consumo da API**, não sendo o foco principal da solução.

---

### 🔧 Backend (Core)
- Node.js
- Express
- MySQL (Aiven – Cloud Database)
- JWT (JSON Web Token)
- Cors
- Dotenv

### 🎨 Frontend
- React
- Vite
- Axios
- CSS Modules / Standard CSS

### ☁️ Infraestrutura
- Render — Backend
- Vercel — Frontend
- Aiven — MySQL Cloud


---

## 🔐 Autenticação & Segurança

- Autenticação via **JWT**
- Middleware de proteção de rotas
- Tokens enviados via **Authorization Header**
- Variáveis sensíveis isoladas em **.env**

---

## 🛠️ Funcionalidades (MVP)

- [x] Autenticação de usuários (Login)
- [x] Geração e validação de JWT
- [x] Proteção de rotas privadas
- [x] CRUD de produtos
- [x] Sistema de avaliações (nota + comentário)
- [x] Atualização automática da média de notas
- [x] Integração com banco MySQL na nuvem
- [x] filtros e ordenação

---

## ⚙️ Executando o Backend Localmente

### Pré-requisitos
- Node.js (LTS)
- Git

### Clone do repositório
```bash
git clone https://github.com/SEU_USUARIO/gerencia-inventario.git
cd gerencia-inventario/backend

Instalação das dependências
npm install

Configuração do ambiente (.env)
DB_HOST=seu-host-aiven.com
DB_USER=avnadmin
DB_PASS=sua-senha
DB_NAME=defaultdb
DB_PORT=18423
JWT_SECRET=sua_chave_secreta

Execução
npm run dev
```

📍 API disponível em:

http://localhost:3000/api

🔗 Deploy

Backend (Render):
https://sua-api.onrender.com

👤 Usuário de Teste

Para validação rápida:

Email: admin@admin.com
Senha: 123456

🧪 Status do Projeto




Este projeto encontra-se em fase MVP, tendo como objetivo adicionar funcionalidades conforme o desenvolvimento e domínio da linguagem.

### *🛣️ Planos Futuros (Roadmap)*

🔄 CRUD completo de usuários

🧩 Controle de permissões (RBAC)

🧪 Testes automatizados (Jest + Supertest)

📄 Paginação

📊 Sistema de logs

🐳 Dockerização da aplicação

🔐 Refresh Tokens e expiração avançada

📈 Cache com Redis


📝 Licença



👨‍💻 Autor

###### Desenvolvido por Isabelle Lemos

###### GitHub: https://github.com/lislemos