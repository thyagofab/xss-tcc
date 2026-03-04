import { SearchBar } from '../molecules/SearchBar';

type NavTarget = 'home' | 'ofertas' | 'categorias' | 'contato';

interface HeaderProps {
  query: string;
  onSearch: (query: string) => void;
  activeNav: NavTarget;
  onNavigate: (target: NavTarget) => void;
}

export const Header = ({ query, onSearch, activeNav, onNavigate }: HeaderProps) => {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <div className="logo-slot" aria-label="Espaco para logo da loja">
          <span>LOGO</span>
          <small>Substituir pela marca</small>
        </div>
        <p className="kicker">Laboratorio de Seguranca Web</p>
        <h1>ByteBazaar</h1>
        <p className="subtitle">E-commerce demonstrativo com foco em vulnerabilidades XSS.</p>
      </div>

      <div className="site-header__actions">
        <nav className="top-nav" aria-label="Menu principal">
          <button type="button" className={activeNav === 'home' ? 'is-active' : ''} onClick={() => onNavigate('home')}>Home</button>
          <button type="button" className={activeNav === 'ofertas' ? 'is-active' : ''} onClick={() => onNavigate('ofertas')}>Ofertas</button>
          <button type="button" className={activeNav === 'categorias' ? 'is-active' : ''} onClick={() => onNavigate('categorias')}>Categorias</button>
          <button type="button" className={activeNav === 'contato' ? 'is-active' : ''} onClick={() => onNavigate('contato')}>Contato</button>
        </nav>
        <SearchBar defaultQuery={query} onSearch={onSearch} />
      </div>
    </header>
  );
};