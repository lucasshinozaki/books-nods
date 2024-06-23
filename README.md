# Livraria API

Bem-vindo à Livraria API! Este projeto é uma API RESTful desenvolvida para gerenciar uma livraria, permitindo a criação, leitura, atualização e exclusão de livros. A API foi construída utilizando Node.js e Express, com MongoDB como banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript assíncrono e baseado em eventos.
- **Express**: Framework web para Node.js, rápido e minimalista.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js.
- **dotenv**: Módulo que carrega variáveis de ambiente a partir de um arquivo `.env`.
- **Nodemon**: Ferramenta que reinicia automaticamente o servidor Node.js quando alterações são detectadas.

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/livraria-api.git
   cd livraria-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/livraria
   ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```

   Ou, para desenvolvimento com reinicialização automática usando Nodemon:
   ```bash
   npm run dev
   ```
