import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryTabs } from '../components/molecules/CategoryTabs';
import { ProductDetails } from '../components/organisms/ProductDetails';
import { ProductCard } from '../components/organisms/ProductCard';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import type { Product, Usuario } from '../types/domain';

const API_BASE = 'http://localhost:3001/api';
const CHAVE_TOKEN_LOCALSTORAGE = 'token_usuario_tcc';
const CHAVE_COOKIE_SESSAO = 'token_usuario_tcc';

interface CatalogProduct extends Product {
  price: string;
  oldPrice: string;
  savings: string;
  imageUrl: string;
  buyLink: string;
  category: 'Cadernos' | 'Smartphones' | 'Notebooks' | 'Monitores' | 'Perifericos' | 'Acessorios';
}

type AlvoNavegacao = 'home' | 'ofertas' | 'categorias' | 'contato' | 'login';
type CategoriaExibida = 'Todos' | CatalogProduct['category'];
const ORDEM_CATEGORIAS: CatalogProduct['category'][] = [
  'Smartphones',
  'Notebooks',
  'Monitores',
  'Cadernos',
  'Perifericos',
  'Acessorios'
];

const CATEGORIA_POR_NOME: Record<string, CatalogProduct['category']> = {
  'Acer Nitro 5 - TCC Edition': 'Notebooks',
  'Galaxy M13 4GB 64GB': 'Smartphones',
  'Galaxy M33 5G 6GB 128GB': 'Smartphones',
  'Galaxy S22 Ultra 256GB': 'Smartphones',
  'Monitor UltraWide Vision Pro 29': 'Monitores',
  'Caderno Smart Notes 360': 'Cadernos',
  'Teclado Mecanico RGB Pro': 'Perifericos',
  'Mouse Gamer Falcon X': 'Perifericos',
  'Headset Pulse 7.1': 'Acessorios',
  'Webcam Stream HD 1080p': 'Acessorios',
  'Notebook DevBook Air 14': 'Notebooks',
  'Monitor PixelView 24 IPS': 'Monitores',
  'Caderno Study Planner Max': 'Cadernos'
};

const IMAGEM_PADRAO_PRODUTO = '/images.jpeg';

const IMAGEM_POR_NOME_PRODUTO: Record<string, string> = {
  'Acer Nitro 5 - TCC Edition': '/acer-nitro-v15-06.avif',
  'Galaxy M13 4GB 64GB': '/celular1.webp',
  'Galaxy M33 5G 6GB 128GB': '/celular1.webp',
  'Galaxy S22 Ultra 256GB': '/celular2.webp',
  'Monitor UltraWide Vision Pro 29': '/monitor.avif',
  'Caderno Smart Notes 360': '/caderno.webp',
  'Teclado Mecanico RGB Pro': '/teclado.jpg',
  'Mouse Gamer Falcon X': '/mouse.webp',
  'Headset Pulse 7.1': '/images.jpeg',
  'Webcam Stream HD 1080p': '/webcam.jpg',
  'Notebook DevBook Air 14': '/notebook1.png',
  'Monitor PixelView 24 IPS': '/monitor.avif',
  'Caderno Study Planner Max': '/caderno.webp'
};

const DUVIDAS_FREQUENTES = [
  {
    pergunta: 'Frete para capitais',
    resposta: 'Entregas para capitais acontecem entre 2 e 5 dias uteis, conforme disponibilidade do produto.'
  },
  {
    pergunta: 'Frete para interior',
    resposta: 'Para cidades do interior, o prazo medio e de 4 a 10 dias uteis.'
  },
  {
    pergunta: 'Garantia dos produtos',
    resposta: 'Todos os produtos possuem garantia minima de 12 meses contra defeitos de fabricacao.'
  },
  {
    pergunta: 'Trocas e devolucoes',
    resposta: 'Voce pode solicitar troca ou devolucao em ate 7 dias corridos apos o recebimento.'
  },
  {
    pergunta: 'Suporte tecnico',
    resposta: 'O atendimento funciona em horario comercial por WhatsApp e email para duvidas e pos-venda.'
  }
];

const formatarProdutoCatalogo = (produto: Product, indice: number): CatalogProduct => {
  const tabelaPrecos = [
    { price: 'R$ 3.299', oldPrice: 'R$ 7.499', savings: 'R$ 4.200' },
    { price: 'R$ 1.049', oldPrice: 'R$ 1.499', savings: 'R$ 450' },
    { price: 'R$ 1.699', oldPrice: 'R$ 2.499', savings: 'R$ 800' },
    { price: 'R$ 3.199', oldPrice: 'R$ 4.099', savings: 'R$ 900' }
  ];

  const precoSelecionado = tabelaPrecos[indice % tabelaPrecos.length];
  return {
    ...produto,
    ...precoSelecionado,
    imageUrl:
      IMAGEM_POR_NOME_PRODUTO[produto.name] ??
      IMAGEM_PADRAO_PRODUTO,
    buyLink: `https://example.com/produto/${produto.id}`,
    category: CATEGORIA_POR_NOME[produto.name] ?? 'Acessorios'
  };
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [erroComentario, setErroComentario] = useState('');
  const [consulta, setConsulta] = useState('');
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState<number | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaExibida>('Todos');
  const [navegacaoAtiva, setNavegacaoAtiva] = useState<AlvoNavegacao>('home');
  const [indiceDuvidaAberta, setIndiceDuvidaAberta] = useState<number | null>(0);
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [tokenSessao, setTokenSessao] = useState('');
  const refsCarrosseis = {
    row1: useRef<HTMLElement | null>(null),
    row2: useRef<HTMLElement | null>(null),
    row3: useRef<HTMLElement | null>(null)
  };

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    setConsulta(parametros.get('q') ?? '');
    const produtoNaUrl = Number(parametros.get('product') ?? 0);
    setIdProdutoSelecionado(produtoNaUrl > 0 ? produtoNaUrl : null);

    const tokenArmazenado = localStorage.getItem(CHAVE_TOKEN_LOCALSTORAGE) ?? '';
    setTokenSessao(tokenArmazenado);

    if (tokenArmazenado) {
      const carregarSessao = async () => {
        try {
          const resposta = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              Authorization: `Bearer ${tokenArmazenado}`
            }
          });

          if (!resposta.ok) {
            localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
            setTokenSessao('');
            return;
          }

          const dados = (await resposta.json()) as { user: Usuario };
          // Mantem cookie inseguro sincronizado para demonstracao de XSS.
          document.cookie = `${CHAVE_COOKIE_SESSAO}=${encodeURIComponent(tokenArmazenado)}; path=/; SameSite=Lax`;
          setUsuarioLogado(dados.user);
        } catch {
          localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
          setTokenSessao('');
        }
      };

      void carregarSessao();
    }
  }, []);

  const buscarProdutos = async () => {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await fetch(`${API_BASE}/products`);
      if (!resposta.ok) {
        throw new Error('Nao foi possivel carregar os produtos.');
      }
      const dados = (await resposta.json()) as Product[];
      setProdutos(dados);
    } catch {
      setErro('Falha ao carregar produtos da API. Confira se o backend esta rodando na porta 3001.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const aoBuscar = (termoBusca: string) => {
    setConsulta(termoBusca.trim());
    setNavegacaoAtiva('home');
    setIdProdutoSelecionado(null);
  };

  const abrirProduto = (idProduto: number) => {
    setIdProdutoSelecionado(idProduto);
    setNavegacaoAtiva('ofertas');
  };

  const fecharProduto = () => {
    setIdProdutoSelecionado(null);
    setNavegacaoAtiva('ofertas');
    requestAnimationFrame(() => {
      rolarParaSecao('offers-section');
    });
  };

  const rolarParaSecao = (idSecao: string) => {
    const elemento = document.getElementById(idSecao);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const aoNavegar = (destino: AlvoNavegacao) => {
    setNavegacaoAtiva(destino);
    if (destino === 'home') {
      setIdProdutoSelecionado(null);
      rolarParaSecao('home-section');
    }
    if (destino === 'ofertas') {
      rolarParaSecao('offers-section');
    }
    if (destino === 'categorias') {
      rolarParaSecao('categories-section');
    }
    if (destino === 'contato') {
      rolarParaSecao('contact-section');
    }
    if (destino === 'login') {
      navigate('/login');
    }
  };

  const adicionarComentario = async (idProduto: number, conteudo: string) => {
    if (!tokenSessao) {
      setErroComentario('Faca login para comentar.');
      throw new Error('Usuario nao autenticado.');
    }

    setErroComentario('');

    const resposta = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenSessao}`
      },
      body: JSON.stringify({ productId: idProduto, content: conteudo })
    });

    if (!resposta.ok) {
      const payload = (await resposta.json().catch(() => null)) as { error?: string } | null;
      setErroComentario(payload?.error ?? 'Erro ao salvar comentario.');
      throw new Error('Erro ao salvar comentario.');
    }

    setErroComentario('');
    await buscarProdutos();
  };

  const fazerLogout = () => {
    localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
    document.cookie = `${CHAVE_COOKIE_SESSAO}=; path=/; Max-Age=0; SameSite=Lax`;
    setTokenSessao('');
    setUsuarioLogado(null);
  };

  const abrirPaginaLogin = () => {
    aoNavegar('login');
  };

  const produtosCatalogo = useMemo(() => produtos.map(formatarProdutoCatalogo), [produtos]);
  const produtosFiltradosPorCategoria = useMemo(() => {
    if (categoriaSelecionada === 'Todos') {
      return produtosCatalogo;
    }
    return produtosCatalogo.filter((produto) => produto.category === categoriaSelecionada);
  }, [produtosCatalogo, categoriaSelecionada]);

  const produtosPorCategoria = useMemo(() => {
    const grupos: Record<CatalogProduct['category'], CatalogProduct[]> = {
      Smartphones: [],
      Notebooks: [],
      Monitores: [],
      Cadernos: [],
      Perifericos: [],
      Acessorios: []
    };

    produtosCatalogo.forEach((produto) => {
      grupos[produto.category].push(produto);
    });

    return grupos;
  }, [produtosCatalogo]);

  const categoriaPrincipal: CatalogProduct['category'] =
    categoriaSelecionada === 'Todos' ? 'Smartphones' : categoriaSelecionada;
  const categoriaSecundaria: CatalogProduct['category'] =
    categoriaSelecionada === 'Todos'
      ? 'Monitores'
      : ORDEM_CATEGORIAS.find(
          (categoria) => categoria !== categoriaPrincipal && produtosPorCategoria[categoria].length > 0
        ) ?? categoriaPrincipal;

  const produtosPrimeiraLinha = produtosPorCategoria[categoriaPrincipal];
  const produtosSegundaLinha = produtosPorCategoria[categoriaSecundaria];
  const produtosTerceiraLinha = categoriaSelecionada === 'Todos' ? produtosCatalogo : produtosFiltradosPorCategoria;
  const produtoSelecionado = produtosCatalogo.find((item) => item.id === idProdutoSelecionado);

  const moverCarrossel = (linha: 'row1' | 'row2' | 'row3', direcao: 'left' | 'right') => {
    const elemento = refsCarrosseis[linha].current;
    if (!elemento) {
      return;
    }

    const quantidade = Math.max(320, Math.floor(elemento.clientWidth * 0.7));
    const rolagemMaxima = elemento.scrollWidth - elemento.clientWidth;
    const noInicio = elemento.scrollLeft <= 2;
    const noFim = elemento.scrollLeft >= rolagemMaxima - 2;

    if (direcao === 'right' && noFim) {
      elemento.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direcao === 'left' && noInicio) {
      elemento.scrollTo({ left: rolagemMaxima, behavior: 'smooth' });
      return;
    }

    const deslocamento = direcao === 'left' ? -quantidade : quantidade;
    elemento.scrollBy({ left: deslocamento, behavior: 'smooth' });
  };

  return (
    <StoreTemplate
      consulta={consulta}
      aoBuscar={aoBuscar}
      navegacaoAtiva={navegacaoAtiva}
      aoNavegar={aoNavegar}
      usuarioLogado={usuarioLogado}
    >
      {!produtoSelecionado ? (
        <section className="quem-somos" id="quem-somos-section">
          <div className="quem-somos__media" aria-hidden="true">
            <img src="/logo.png" alt="" loading="lazy" />
          </div>
          <div className="quem-somos__conteudo">
            <h3>Quem Somos</h3>
            <p>
              A Nexora Tech e uma loja focada em tecnologia para estudo, trabalho e performance.
              Nosso objetivo e reunir produtos confiaveis para montagem de setup completo,
              com precos competitivos e uma experiencia de compra simples.
            </p>
            <p>
              Este projeto simula um e-commerce real para fins academicos, com foco em usabilidade,
              organizacao por categorias e demonstracoes praticas para o TCC.
            </p>
          </div>
        </section>
      ) : null}

      <div id="categories-section">
        <CategoryTabs
          categoriaSelecionada={categoriaSelecionada}
          aoSelecionarCategoria={(categoria) => setCategoriaSelecionada(categoria as CategoriaExibida)}
        />
      </div>

      {carregando ? <p className="status-text">Carregando produtos...</p> : null}
      {erro ? <p className="status-text status-text--error">{erro}</p> : null}

      {!carregando && !erro && produtoSelecionado ? (
        <ProductDetails
          produto={produtoSelecionado}
          aoVoltar={fecharProduto}
          aoAdicionarComentario={adicionarComentario}
          usuarioLogado={usuarioLogado}
          erroComentario={erroComentario}
          aoLogout={fazerLogout}
          aoIrParaLogin={abrirPaginaLogin}
        />
      ) : null}

      {!carregando && !erro && !produtoSelecionado && categoriaSelecionada === 'Todos' ? (
        <>
          <section className="deal-row-head" id="offers-section">
            <h3>Aproveite as melhores ofertas em <span>{categoriaPrincipal}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moverCarrossel('row1', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moverCarrossel('row1', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setCategoriaSelecionada(categoriaPrincipal)}>Ver todos</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { refsCarrosseis.row1.current = el; }}>
            {produtosPrimeiraLinha.map((produto) => (
              <ProductCard key={`linha-1-${produto.id}`} product={produto} aoSelecionar={abrirProduto} />
            ))}
          </section>

          <section className="deal-row-head">
            <h3>Ofertas em alta de <span>{categoriaSecundaria}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moverCarrossel('row2', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moverCarrossel('row2', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setCategoriaSelecionada(categoriaSecundaria)}>Ver todos</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { refsCarrosseis.row2.current = el; }}>
            {produtosSegundaLinha.map((produto) => (
              <ProductCard key={`linha-2-${produto.id}`} product={produto} aoSelecionar={abrirProduto} />
            ))}
          </section>

          <section className="deal-row-head">
            <h3>Explore todas as ofertas em <span>{categoriaSelecionada}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moverCarrossel('row3', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moverCarrossel('row3', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setCategoriaSelecionada('Todos')}>Ver todos</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { refsCarrosseis.row3.current = el; }}>
            {produtosTerceiraLinha.map((produto) => (
              <ProductCard key={`linha-3-${produto.id}`} product={produto} aoSelecionar={abrirProduto} />
            ))}
          </section>
        </>
      ) : null}

      {!carregando && !erro && !produtoSelecionado && categoriaSelecionada !== 'Todos' ? (
        <>
          <section className="deal-row-head" id="offers-section">
            <h3>Ofertas da categoria <span>{categoriaSelecionada}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moverCarrossel('row1', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moverCarrossel('row1', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setCategoriaSelecionada('Todos')}>Ver todos</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { refsCarrosseis.row1.current = el; }}>
            {produtosFiltradosPorCategoria.map((produto) => (
              <ProductCard key={`categoria-${produto.id}`} product={produto} aoSelecionar={abrirProduto} />
            ))}
          </section>
        </>
      ) : null}

      {!carregando && !erro && produtos.length === 0 ? (
        <p className="status-text">Nenhum produto encontrado.</p>
      ) : null}

      <section className="duvidas-frequentes" id="duvidas-section">
        <h3>Duvidas Frequentes</h3>
        <div className="duvidas-frequentes__lista">
          {DUVIDAS_FREQUENTES.map((duvida, indice) => {
            const aberta = indiceDuvidaAberta === indice;
            return (
              <article key={duvida.pergunta} className={`duvida-item ${aberta ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="duvida-item__pergunta"
                  onClick={() => setIndiceDuvidaAberta(aberta ? null : indice)}
                  aria-expanded={aberta}
                >
                  <span>{duvida.pergunta}</span>
                  <strong>{aberta ? '−' : '+'}</strong>
                </button>
                {aberta ? <p className="duvida-item__resposta">{duvida.resposta}</p> : null}
              </article>
            );
          })}
        </div>
      </section>
    </StoreTemplate>
  );
};
