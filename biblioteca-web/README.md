# Biblioteca Web

Sistema web para cadastro de **Autores** e **Livros** (um autor pode ter vários livros, relacionamento 1:N).
Exercício da Parte 2 de Engenharia de Software (Prof. Sandro Laudares), baseado no projeto Agenda Web.

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
├── docker-compose.yml  # backend + frontend + postgres
├── .github/workflows/ci-cd.yml
└── README.md
```

## Modelo de dados

`autores` (id, nome, nacionalidade, data_nascimento, criado_em) 1 — N `livros` (id, titulo, isbn, ano_publicacao, genero, autor_id FK, criado_em)

## Endpoints

| Verbo | URL | Status |
|---|---|---|
| POST | /api/autores | 201 |
| GET | /api/autores | 200 |
| GET / PUT / DELETE | /api/autores/{id} | 200 ou 404 |
| POST | /api/livros | 201 |
| GET | /api/livros | 200 |
| GET / PUT / DELETE | /api/livros/{id} | 200 ou 404 |
| GET (extra) | /api/livros/autor/{autorId} | 200 |

Exemplo: `{"titulo":"Dom Casmurro","isbn":"978-8535910667","anoPublicacao":1899,"genero":"Romance","autor":{"id":1}}`

## Como executar

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080/api/autores
- Swagger: http://localhost:8080/swagger-ui.html

Só o banco (para rodar o backend localmente): `docker-compose up -d postgres`, depois `cd backend && mvn spring-boot:run` e `cd frontend && npm install && npm start`.

## Como rodar os testes

```bash
cd backend && mvn test                              # todos
cd backend && mvn test -Dtest="*ControllerTest"     # unitários
cd backend && mvn test -Dtest="IntegracaoTest"      # integração
cd frontend && npm test -- --watchAll=false --passWithNoTests
```

## Divisão do trabalho

| Integrante | Responsabilidade | Branch |
|---|---|---|
| Aluno(a) 1 | CRUD de Autores (model, repository, controller, teste, AutorList, AutorForm) | feature/autores |
| Aluno(a) 2 | CRUD de Livros (model, repository, controller, teste, LivroList, LivroForm) | feature/livros |

Arquivos comuns (api.js, App.js, docker-compose.yml, CI, README) divididos entre a dupla.
