/// <reference types="node" />
// teste
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

  await prisma.product.create({
    data: {
      name: 'Galaxy M13 4GB 64GB',
      description: 'Smartphone intermediario com foco em bateria de longa duracao.',
      comments: {
        create: [
          { content: 'Bom custo-beneficio para uso diario.' },
          { content: 'Tela boa e bateria dura bastante.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Galaxy M33 5G 6GB 128GB',
      description: 'Modelo 5G com desempenho equilibrado para estudo e trabalho.',
      comments: {
        create: [
          { content: '5G funcionou muito bem na minha regiao.' },
          { content: 'Desempenho estavel para apps pesados.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Galaxy S22 Ultra 256GB',
      description: 'Smartphone premium com camera avancada e alta performance.',
      comments: {
        create: [
          { content: 'Camera excelente para foto noturna.' },
          { content: 'Aparelho rapido e acabamento premium.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Monitor UltraWide Vision Pro 29',
      description: 'Monitor ultrawide ideal para produtividade e multitarefa.',
      comments: {
        create: [
          { content: 'Excelente para trabalhar com duas janelas.' },
          { content: 'Imagem nitida e cores bem equilibradas.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Caderno Smart Notes 360',
      description: 'Caderno inteligente reutilizavel para anotacoes e estudos.',
      comments: {
        create: [
          { content: 'Perfeito para organizacao no dia a dia.' },
          { content: 'Gostei da praticidade para revisar materia.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Teclado Mecanico RGB Pro',
      description: 'Teclado mecanico com switches blue e iluminacao RGB personalizavel.',
      comments: {
        create: [
          { content: 'Digitacao muito confortavel para programar.' },
          { content: 'Iluminacao bonita e facil de configurar.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Mouse Gamer Falcon X',
      description: 'Mouse com alta precisao e ajuste de DPI para jogos e produtividade.',
      comments: {
        create: [
          { content: 'Pegada excelente e sensor muito preciso.' },
          { content: 'Leve e muito bom para FPS.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Headset Pulse 7.1',
      description: 'Headset com audio surround virtual e microfone removivel.',
      comments: {
        create: [
          { content: 'Audio limpo e bom isolamento de ruido.' },
          { content: 'Uso em call e jogo sem cansar.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Webcam Stream HD 1080p',
      description: 'Webcam Full HD para aulas, reunioes e criacao de conteudo.',
      comments: {
        create: [
          { content: 'Imagem nitida para videochamadas.' },
          { content: 'Funcionou plug-and-play no meu setup.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Notebook DevBook Air 14',
      description: 'Notebook compacto com foco em produtividade para desenvolvimento.',
      comments: {
        create: [
          { content: 'Leve, rapido e perfeito para levar para faculdade.' },
          { content: 'Boa autonomia de bateria no uso diario.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Monitor PixelView 24 IPS',
      description: 'Monitor 24 polegadas com painel IPS e cores vivas.',
      comments: {
        create: [
          { content: 'Excelente qualidade de imagem para programacao.' },
          { content: 'Otimo custo-beneficio para setup home office.' },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Caderno Study Planner Max',
      description: 'Caderno de organizacao academica com planejamento semanal.',
      comments: {
        create: [
          { content: 'Me ajudou muito a organizar as entregas do semestre.' },
          { content: 'Folhas e divisorias de boa qualidade.' },
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
