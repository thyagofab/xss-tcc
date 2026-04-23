# xss-tcc

Repositório do projeto de TCC com frontend React + Vite e backend Node/Express com Prisma.

## Estrutura

- `my-app/`: aplicação principal
	- `src/components/atoms`, `molecules`, `organisms`, `templates`
	- `src/pages`
	- `server.ts` (API)
	- `prisma/` (schema e seed)

## Como rodar

```bash

npm install
npx prisma generate
npx prisma db push
npm run dev
```

Para a API:

```bash
npx ts-node server.ts
```