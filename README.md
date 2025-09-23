# Teddy Frontend Challenge

Este é o projeto frontend desenvolvido com **React + TypeScript + Vite**, pronto para rodar via **Docker**.

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (somente se for rodar localmente)
- [pnpm](https://pnpm.io/) (opcional, só para desenvolvimento local)
- [Docker](https://www.docker.com/)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/FelipeBuso/teddy-frontend-challenge.git
cd teddy-frontend-challenge
```

---

## 2. Instalar dependências (opcional, só para dev local)

```bash
pnpm install
```

---

## 3. Rodar em modo de desenvolvimento (opcional)

```bash
pnpm run dev
```

---

## 4. Build da imagem Docker

```bash
docker build -t teddy-frontend-challenge .
```

---

## 5. Rodar o container

```bash
docker run -p 8080:80 teddy-frontend-challenge
```

---

## 6. Acesse o app

http://localhost:8080
