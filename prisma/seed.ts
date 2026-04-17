/// <reference types="node" />
// teste
import prismaPkg from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { createHash, randomBytes } from 'crypto'

const { PrismaClient } = prismaPkg

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
})

const prisma = new PrismaClient({ adapter })

const hashSenha = (senha: string) => {
  const salt = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(`${salt}:${senha}`).digest('hex')
  return `${salt}:${hash}`
}

type ComentarioSeed = {
  content: string
  username: string
}

const criarProdutoComComentarios = async (dados: {
  name: string
  description: string
  comments: ComentarioSeed[]
}) => {
  await prisma.product.create({
    data: {
      name: dados.name,
      description: dados.description,
      comments: {
        create: dados.comments.map((comentario) => ({
          content: comentario.content,
          user: {
            connect: {
              username: comentario.username,
            },
          },
        })),
      },
    },
  })
}

async function main() {
  await prisma.comment.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()

  await prisma.user.createMany({
    data: [
      { username: 'Ana Silva', email: 'ana@nexora.com', password: hashSenha('1234') },
      { username: 'Bruno Santos', email: 'bruno@nexora.com', password: hashSenha('1234') },
      { username: 'Carla Souza', email: 'carla@nexora.com', password: hashSenha('1234') },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Acer Nitro 5 - TCC Edition',
    description: 'Notebook de alta performance para testes de intrusão.',
    comments: [
      { content: 'Melhor notebook que ja comprei!', username: 'Ana Silva' },
      { content: 'Atencao: Testando <b>HTML</b> no comentario.', username: 'Bruno Santos' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Galaxy M13 4GB 64GB',
    description: 'Smartphone intermediario com foco em bateria de longa duracao.',
    comments: [
      { content: 'Bom custo-beneficio para uso diario.', username: 'Ana Silva' },
      { content: 'Tela boa e bateria dura bastante.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Galaxy M33 5G 6GB 128GB',
    description: 'Modelo 5G com desempenho equilibrado para estudo e trabalho.',
    comments: [
      { content: '5G funcionou muito bem na minha regiao.', username: 'Bruno Santos' },
      { content: 'Desempenho estavel para apps pesados.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Galaxy S22 Ultra 256GB',
    description: 'Smartphone premium com camera avancada e alta performance.',
    comments: [
      { content: 'Camera excelente para foto noturna.', username: 'Ana Silva' },
      { content: 'Aparelho rapido e acabamento premium.', username: 'Bruno Santos' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Monitor UltraWide Vision Pro 29',
    description: 'Monitor ultrawide ideal para produtividade e multitarefa.',
    comments: [
      { content: 'Excelente para trabalhar com duas janelas.', username: 'Bruno Santos' },
      { content: 'Imagem nitida e cores bem equilibradas.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Caderno Smart Notes 360',
    description: 'Caderno inteligente reutilizavel para anotacoes e estudos.',
    comments: [
      { content: 'Perfeito para organizacao no dia a dia.', username: 'Ana Silva' },
      { content: 'Gostei da praticidade para revisar materia.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Teclado Mecanico RGB Pro',
    description: 'Teclado mecanico com switches blue e iluminacao RGB personalizavel.',
    comments: [
      { content: 'Digitacao muito confortavel para programar.', username: 'Bruno Santos' },
      { content: 'Iluminacao bonita e facil de configurar.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Mouse Gamer Falcon X',
    description: 'Mouse com alta precisao e ajuste de DPI para jogos e produtividade.',
    comments: [
      { content: 'Pegada excelente e sensor muito preciso.', username: 'Ana Silva' },
      { content: 'Leve e muito bom para FPS.', username: 'Bruno Santos' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Headset Pulse 7.1',
    description: 'Headset com audio surround virtual e microfone removivel.',
    comments: [
      { content: 'Audio limpo e bom isolamento de ruido.', username: 'Bruno Santos' },
      { content: 'Uso em call e jogo sem cansar.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Webcam Stream HD 1080p',
    description: 'Webcam Full HD para aulas, reunioes e criacao de conteudo.',
    comments: [
      { content: 'Imagem nitida para videochamadas.', username: 'Ana Silva' },
      { content: 'Funcionou plug-and-play no meu setup.', username: 'Carla Souza' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Notebook DevBook Air 14',
    description: 'Notebook compacto com foco em produtividade para desenvolvimento.',
    comments: [
      { content: 'Leve, rapido e perfeito para levar para faculdade.', username: 'Bruno Santos' },
      { content: 'Boa autonomia de bateria no uso diario.', username: 'Ana Silva' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Monitor PixelView 24 IPS',
    description: 'Monitor 24 polegadas com painel IPS e cores vivas.',
    comments: [
      { content: 'Excelente qualidade de imagem para programacao.', username: 'Carla Souza' },
      { content: 'Otimo custo-beneficio para setup home office.', username: 'Ana Silva' },
    ],
  })

  await criarProdutoComComentarios({
    name: 'Caderno Study Planner Max',
    description: 'Caderno de organizacao academica com planejamento semanal.',
    comments: [
      { content: 'Me ajudou muito a organizar as entregas do semestre.', username: 'Carla Souza' },
      { content: 'Folhas e divisorias de boa qualidade.', username: 'Bruno Santos' },
    ],
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
