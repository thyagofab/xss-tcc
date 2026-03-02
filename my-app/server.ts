import express, { type Request, type Response } from 'express';
import prismaPkg from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import cors from 'cors';

const { PrismaClient } = prismaPkg;

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });
const app = express();

// Permite que o React (porta diferente) consuma essa API
app.use(cors());
// Permite que a API entenda requisições em JSON
app.use(express.json());

// 1. Rota para listar produtos e seus comentários
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { comments: true }
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// 2. Rota VULNERÁVEL para adicionar comentários (Stored XSS)
app.post('/api/comments', async (req: Request, res: Response) => {
  const { productId, content } = req.body;
  
  try {
    // VULNERABILIDADE (OWASP A03:2021): 
    // O conteúdo (content) recebido do usuário vai direto para o banco de dados
    // sem passar por nenhuma função de sanitização ou escape HTML.
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        productId: Number(productId)
      }
    });
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar comentário" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 API Vulnerável do TCC rodando na porta ${PORT}`);
});