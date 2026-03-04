import type { ReactNode } from 'react';
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';

type NavTarget = 'home' | 'ofertas' | 'categorias' | 'contato';

interface StoreTemplateProps {
  children: ReactNode;
  query: string;
  onSearch: (query: string) => void;
  activeNav: NavTarget;
  onNavigate: (target: NavTarget) => void;
}

export const StoreTemplate = ({ children, query, onSearch, activeNav, onNavigate }: StoreTemplateProps) => {
  return (
    <div className="store-shell" id="home-section">
      <div className="glow glow--one" aria-hidden="true" />
      <div className="glow glow--two" aria-hidden="true" />
      <Header query={query} onSearch={onSearch} activeNav={activeNav} onNavigate={onNavigate} />
      <main>{children}</main>
      <div id="contact-section">
        <Footer />
      </div>
    </div>
  );
};
