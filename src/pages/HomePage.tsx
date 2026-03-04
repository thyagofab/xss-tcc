import { useEffect, useMemo, useRef, useState } from 'react';
import { VulnerableHtml } from '../components/atoms/VulnerableHtml';
import { CategoryTabs } from '../components/molecules/CategoryTabs';
import { HeroBanner } from '../components/organisms/HeroBanner';
import { ProductDetails } from '../components/organisms/ProductDetails';
import { PromoStrip } from '../components/organisms/PromoStrip';
import { ProductCard } from '../components/organisms/ProductCard';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import type { Product } from '../types/domain';

interface CatalogProduct extends Product {
  price: string;
  oldPrice: string;
  savings: string;
  imageLabel: string;
  buyLink: string;
  category: 'Cadernos' | 'Smartphones' | 'Notebooks' | 'Monitores' | 'Perifericos' | 'Acessorios';
}

type NavTarget = 'home' | 'ofertas' | 'categorias' | 'contato';
type DisplayCategory = 'Todos' | CatalogProduct['category'];
const CATEGORY_ORDER: CatalogProduct['category'][] = [
  'Smartphones',
  'Notebooks',
  'Monitores',
  'Cadernos',
  'Perifericos',
  'Acessorios'
];

const CATEGORY_BY_NAME: Record<string, CatalogProduct['category']> = {
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

const formatCatalogProduct = (product: Product, index: number): CatalogProduct => {
  const prices = [
    { price: 'R$ 3.299', oldPrice: 'R$ 7.499', savings: 'R$ 4.200' },
    { price: 'R$ 1.049', oldPrice: 'R$ 1.499', savings: 'R$ 450' },
    { price: 'R$ 1.699', oldPrice: 'R$ 2.499', savings: 'R$ 800' },
    { price: 'R$ 3.199', oldPrice: 'R$ 4.099', savings: 'R$ 900' }
  ];

  const preset = prices[index % prices.length];
  return {
    ...product,
    ...preset,
    imageLabel: `Imagem ${product.name}`,
    buyLink: `https://example.com/produto/${product.id}`,
    category: CATEGORY_BY_NAME[product.name] ?? 'Acessorios'
  };
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DisplayCategory>('Todos');
  const [activeNav, setActiveNav] = useState<NavTarget>('home');
  const rowRefs = {
    row1: useRef<HTMLElement | null>(null),
    row2: useRef<HTMLElement | null>(null),
    row3: useRef<HTMLElement | null>(null)
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
    const productFromUrl = Number(params.get('product') ?? 0);
    setSelectedProductId(productFromUrl > 0 ? productFromUrl : null);
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('http://localhost:3001/api/products');
      if (!response.ok) {
        throw new Error('Nao foi possivel carregar os produtos.');
      }
      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch {
      setError('Falha ao carregar produtos da API. Confira se o backend esta rodando na porta 3001.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery.trim());
    setActiveNav('home');
    setSelectedProductId(null);
  };

  const openProduct = (productId: number) => {
    setSelectedProductId(productId);
    setActiveNav('ofertas');
  };

  const closeProduct = () => {
    setSelectedProductId(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (target: NavTarget) => {
    setActiveNav(target);
    if (target === 'home') {
      setSelectedProductId(null);
      scrollToSection('home-section');
    }
    if (target === 'ofertas') {
      scrollToSection('offers-section');
    }
    if (target === 'categorias') {
      scrollToSection('categories-section');
    }
    if (target === 'contato') {
      scrollToSection('contact-section');
    }
  };

  const handleAddComment = async (productId: number, content: string) => {
    const response = await fetch('http://localhost:3001/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, content })
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar comentario.');
    }

    await fetchProducts();
  };

  const catalogProducts = useMemo(() => products.map(formatCatalogProduct), [products]);
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return catalogProducts;
    }
    return catalogProducts.filter((product) => product.category === selectedCategory);
  }, [catalogProducts, selectedCategory]);

  const productsByCategory = useMemo(() => {
    const groups: Record<CatalogProduct['category'], CatalogProduct[]> = {
      Smartphones: [],
      Notebooks: [],
      Monitores: [],
      Cadernos: [],
      Perifericos: [],
      Acessorios: []
    };

    catalogProducts.forEach((product) => {
      groups[product.category].push(product);
    });

    return groups;
  }, [catalogProducts]);

  const firstCategory: CatalogProduct['category'] =
    selectedCategory === 'Todos' ? 'Smartphones' : selectedCategory;
  const secondCategory: CatalogProduct['category'] =
    selectedCategory === 'Todos'
      ? 'Monitores'
      : CATEGORY_ORDER.find(
          (category) => category !== firstCategory && productsByCategory[category].length > 0
        ) ?? firstCategory;

  const firstRowProducts = productsByCategory[firstCategory];
  const secondRowProducts = productsByCategory[secondCategory];
  const thirdRowProducts = selectedCategory === 'Todos' ? catalogProducts : filteredByCategory;
  const selectedProduct = catalogProducts.find((item) => item.id === selectedProductId);

  const moveCarousel = (row: 'row1' | 'row2' | 'row3', direction: 'left' | 'right') => {
    const element = rowRefs[row].current;
    if (!element) {
      return;
    }

    const amount = Math.max(320, Math.floor(element.clientWidth * 0.7));
    const maxScroll = element.scrollWidth - element.clientWidth;
    const atStart = element.scrollLeft <= 2;
    const atEnd = element.scrollLeft >= maxScroll - 2;

    if (direction === 'right' && atEnd) {
      element.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction === 'left' && atStart) {
      element.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    const offset = direction === 'left' ? -amount : amount;
    element.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <StoreTemplate query={query} onSearch={handleSearch} activeNav={activeNav} onNavigate={handleNavigate}>
      <HeroBanner
        onViewOffers={() => handleNavigate('ofertas')}
        onViewCollections={() => handleNavigate('categorias')}
      />
      <div id="categories-section">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category as DisplayCategory)}
        />
      </div>
      <PromoStrip />

      {query && (
        <section className="alert-xss">
          <p className="kicker">Reflected XSS</p>
          <p>O parametro `q` da URL e renderizado sem sanitizacao:</p>
          <VulnerableHtml content={query} className="query-preview" />
        </section>
      )}

      {isLoading ? <p className="status-text">Carregando produtos...</p> : null}
      {error ? <p className="status-text status-text--error">{error}</p> : null}

      {!isLoading && !error && selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={closeProduct}
          onAddComment={handleAddComment}
        />
      ) : null}

      {!isLoading && !error && !selectedProduct ? (
        <>
          <section className="deal-row-head" id="offers-section">
            <h3>Grab the best deal on <span>{firstCategory}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moveCarousel('row1', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moveCarousel('row1', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setSelectedCategory(firstCategory)}>View all</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { rowRefs.row1.current = el; }}>
            {firstRowProducts.map((product) => (
              <ProductCard key={`row-1-${product.id}`} product={product} onOpen={openProduct} />
            ))}
          </section>

          <section className="deal-row-head">
            <h3>Trending offers on <span>{secondCategory}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moveCarousel('row2', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moveCarousel('row2', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setSelectedCategory(secondCategory)}>View all</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { rowRefs.row2.current = el; }}>
            {secondRowProducts.map((product) => (
              <ProductCard key={`row-2-${product.id}`} product={product} onOpen={openProduct} />
            ))}
          </section>

          <section className="deal-row-head">
            <h3>Explore all deals in <span>{selectedCategory}</span></h3>
            <div className="deal-row-controls">
              <button type="button" onClick={() => moveCarousel('row3', 'left')}>{'<'}</button>
              <button type="button" onClick={() => moveCarousel('row3', 'right')}>{'>'}</button>
              <button type="button" onClick={() => setSelectedCategory('Todos')}>View all</button>
            </div>
          </section>
          <section className="deal-row" ref={(el) => { rowRefs.row3.current = el; }}>
            {thirdRowProducts.map((product) => (
              <ProductCard key={`row-3-${product.id}`} product={product} onOpen={openProduct} />
            ))}
          </section>
        </>
      ) : null}

      {!isLoading && !error && products.length === 0 ? (
        <p className="status-text">Nenhum produto encontrado.</p>
      ) : null}
    </StoreTemplate>
  );
};
