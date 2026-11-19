# Biblioteca Web

Sistema web para cadastro de **Autores** e **Livros**. Cada livro é escrito por um autor, e um autor pode ter vários livros (relacionamento 1:N).

Exercício em dupla (realizado individualmente), Parte 2 do laboratório de 19/11/2026, de Engenharia de Software (Prof. Sandro Laudares), baseado no projeto Agenda Web.

**Autor:** João Paulo de Deus Natividade Oliveira Saraiva

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 17, Spring Boot 3.2 (Web, Data JPA, Validation), Lombok, Maven |
| Frontend | React 18, React Router 6, Axios, Node.js 20 |
| Banco de dados | PostgreSQL 15 (desenvolvimento), H2 em memória (perfil `test`) |
| Testes | JUnit 5, Mockito, MockMvc, `@SpringBootTest`, JaCoCo |
| Versão e CI | Git, GitHub, GitHub Actions |
| Containers | Docker, Docker Compose |

## Estrutura de pastas

```
biblioteca-web/
├── backend/            # API REST (model, repository, controller, testes)
├── frontend/           # React (components, services)
├── prints/             # Evidências da entrega
├── docker-compose.yml  # backend + frontend + postgres
└── README.md
```

O workflow do GitHub Actions fica em `.github/workflows/biblioteca-ci.yml`, na raiz do repositório.

## Modelo de dados

`autores` (id, nome, nacionalidade, data_nascimento, criado_em) 1:N `livros` (id, titulo, isbn, ano_publicacao, genero, autor_id FK, criado_em)

A chave estrangeira `autor_id` fica na tabela `livros`. O relacionamento é declarado apenas em `Livro.java` (`@ManyToOne`), sem lista de livros em `Autor`, para evitar laço infinito na serialização JSON.

## Endpoints

| Verbo | URL | Status |
|---|---|---|
| POST | /api/autores | 201 |
| GET | /api/autores | 200 (ordenado por nome) |
| GET, PUT, DELETE | /api/autores/{id} | 200 ou 404 |
| POST | /api/livros | 201 |
| GET | /api/livros | 200 (ordenado por título) |
| GET, PUT, DELETE | /api/livros/{id} | 200 ou 404 |
| GET (extra) | /api/livros/autor/{autorId} | 200 |

Exemplo de criação de livro:

```json
{ "titulo": "It: A Coisa", "isbn": "978-85-5651-001-0", "anoPublicacao": 1986, "genero": "Terror", "autor": { "id": 1 } }
```

Itens extras implementados: endpoint de livros por autor, resposta 409 ao excluir autor que possui livros e teste de fluxo completo do autor.

## Como executar

```bash
docker compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080/api/autores
- Swagger: http://localhost:8080/swagger-ui.html

Para executar sem Docker, suba apenas o banco com `docker compose up -d postgres`, depois rode `mvn spring-boot:run` em `backend` e `npm install` seguido de `npm start` em `frontend`.

## Como rodar os testes

```bash
cd backend && mvn test                              # todos
cd backend && mvn test -Dtest="*ControllerTest"     # unitários
cd backend && mvn test -Dtest="IntegracaoTest"      # integração
cd frontend && npm test -- --watchAll=false --passWithNoTests
```

## Divisão de trabalho

| Integrante | Responsabilidade | Branch |
|---|---|---|
| João Paulo de Deus | CRUD de Autores (model, repository, controller, teste, AutorList, AutorForm) | feature/autores |
| João Paulo de Deus | CRUD de Livros (model, repository, controller, testes, LivroList, LivroForm) | feature/livros |

O exercício foi feito individualmente, por isso as duas branches e os dois Pull Requests são do mesmo autor. Cada Pull Request recebeu comentário de revisão e foi integrado à `main`.

## Evidências

### 1. Lista de Autores

Tela `/autores` com a tabela de autores e os botões Editar e Excluir.

![Lista de Autores](prints/c76c7cec-e070-41e3-87ee-00f9d0180351.png)

### 2. Formulário de Autores

Tela de edição de autor, com nome, nacionalidade e data de nascimento.

![Formulário de Autores](prints/3acc1fc0-6a44-430b-a3a4-98662aee3d82.png)

### 3. Lista de Livros

Tela `/livros` mostrando o nome do autor de cada livro.

![Lista de Livros](prints/b93c55f8-23ca-4505-9077-003c46ef8c6e.png)

### 4. Formulário de Livros

Tela de edição de livro, com o campo de seleção de autor.

![Formulário de Livros](prints/a69839b5-6033-4b5c-945e-dc6d09058f4e.png)

### 5. Swagger: corpo enviado no POST /api/livros

Requisição que cria um livro vinculado ao autor de id 1.

![Swagger POST livro, corpo da requisição](prints/ab689600-3360-417a-a55a-7840ae587fba.png)

### 6. Swagger: resposta 201 do POST /api/livros

Resposta com o livro criado e o autor completo dentro dele.

![Swagger POST livro, resposta 201](prints/37b703ec-de3e-47de-891e-7a0e6932ff42.png)

### 7. Testes: mvn test com BUILD SUCCESS

Log do job `test-backend`: 10 testes executados, sem falhas e sem erros.

![mvn test com BUILD SUCCESS](prints/8204e43d-f6eb-4f17-b119-d8dd4a8dc79e.png)

### 8. GitHub Actions

Aba Actions com o pipeline verde na `main` após o merge do Pull Request #2. As execuções anteriores falharam porque o `App.js` já importava telas que ainda não estavam na `main`, e o pipeline passou depois da integração das duas branches.

![GitHub Actions](prints/617a8773-03bd-489b-815c-09e63b930412.png)
