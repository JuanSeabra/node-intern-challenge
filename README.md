# Desafio NodeJS

## Dependências

- node v8 (recomendo instalar [via](https://github.com/creationix/nvm))
  - [yarn](https://yarnpkg.com)

## Instalar dependências e iniciar servidor

```bash
yarn # instalar dependências
yarn start # iniciar servidor
```

## Instruções

Faça um fork do repositório e abra um pull request com seu desafio.

## Objetivos do desafio

Você é livre pra instalar quaiquer libs que quiser.

1. Modifique o arquivo routes/fat.js pra que o comando abaixo retorne o fatorial de um número qualquer `n`
```bash
curl -X POST http://localhost:7777/calcs/fat -H 'Content-Type: application/json' -d '{"n": 1}'

```
2. Implemente a rota que responde com o valor fibonacci de um número. Como a chamada abaixo
```bash
curl -X POST http://localhost:7777/calcs/fib -H 'Content-Type: application/json' -d '{"n": 1}'

```
3. Faça log da URL de todas as requisições que chegam ao servidor automaticamente
4. Implemente rotas de CRUD de uma entidade livro, com os atributos `{id, nome}`. A persistência pode ser em memória, mas usar MongoDB, é um bônus.
5. Atualize a seção [resultados](#resultados) com instruções de como testar o passo 4
6. Bônus: use docker

## Resultados

Teste do CRUD:

**Create**
```bash
curl -X POST http://localhost:7777/livro/create -H 'Content-Type: application/json' -d '{"nome": "Harry Potter", "id": "1"}'

curl -X POST http://localhost:7777/livro/create -H 'Content-Type: application/json' -d '{"nome": "Senhor dos Anéis", "id": "2"}'

curl -X POST http://localhost:7777/livro/create -H 'Content-Type: application/json' -d '{"nome": "Guerra dos Tronos", "id": "3"}'

curl -X POST http://localhost:7777/livro/create -H 'Content-Type: application/json' -d '{"nome": "Entrada a ser Removida", "id": "4"}'

curl -X POST http://localhost:7777/livro/create -H 'Content-Type: application/json' -d '{"nome": "Entrada a ser Editada", "id": "5"}'
```

*É possível listar todas os ítens com:*
`curl -X POST http://localhost:7777/livro/listAll -H 'Content-Type: application/json'`

**Recover (por nome ou por id)**
```bash
curl -X POST http://localhost:7777/livro/recover -H 'Content-Type: application/json' -d '{"nome": "Harry Potter"}'

curl -X POST http://localhost:7777/livro/recover -H 'Content-Type: application/json' -d '{"id": "3"}'
```

**Update (através do id)**
```bash
curl -X POST http://localhost:7777/livro/update -H 'Content-Type: application/json' -d '{"id": "5", "nome_novo": "Bíblia"}'
```

**Destroy(através do id)**
```bash
curl -X POST http://localhost:7777/livro/destroy -H 'Content-Type: application/json' -d '{"id": "4"}'
```
