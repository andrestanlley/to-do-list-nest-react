# Projeto To-Do

Este projeto possui backend, frontend e banco de dados SQL Server, e pode ser executado de duas formas: usando Docker ou manualmente no seu ambiente local.

---

## Como rodar pelo Docker

1. Execute o comando para subir os containers:

```bash
docker-compose up -d
```
- Aguarde alguns minutos após o container subir para que o script de criação do banco de dados rode automaticamente.

Como rodar manualmente
### Backend
Instale as dependências:

```bash
yarn
```
Crie um arquivo .env baseado no arquivo .env.example e configure as variáveis de ambiente conforme seu ambiente.

Rode as migrations para criar a estrutura do banco de dados:

```bash
yarn migration:run
```
Inicie o backend em modo de desenvolvimento:

```bash
yarn start:dev
```
Frontend
Instale as dependências:

```bash
yarn
```
Inicie o frontend em modo de desenvolvimento:

```bash
yarn dev
```

- Acesse em http://localhost:8081

# Atenção
- Verifique se as variáveis de ambiente do frontend e backend estão corretamente configuradas para que o frontend aponte para o backend e vice-versa.