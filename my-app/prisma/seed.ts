/// <reference types="node" />

import prismaPkg from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const { PrismaClient } = prismaPkg

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.comment.deleteMany()
  await prisma.product.deleteMany()

  await prisma.product.create({
    data: {
      name: 'Acer Nitro 5 - TCC Edition',
      description: 'Notebook de alta performance para testes de intrusão.',
      comments: {
        create: [
          { content: 'Melhor notebook que já comprei!' },
          { content: 'Atenção: Testando <b>HTML</b> no comentário.' },
        ],
      },
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
