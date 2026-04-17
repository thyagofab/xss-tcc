import type { ReactNode } from 'react';
import type { Usuario } from '../../types/domain';
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';

type AlvoNavegacao = 'home' | 'ofertas' | 'categorias' | 'contato' | 'login';

interface StoreTemplateProps {
  children: ReactNode;
  consulta: string;
  aoBuscar: (consulta: string) => void;
  navegacaoAtiva: AlvoNavegacao;
  aoNavegar: (destino: AlvoNavegacao) => void;
  usuarioLogado: Usuario | null;
}

export const StoreTemplate = ({ children, consulta, aoBuscar, navegacaoAtiva, aoNavegar, usuarioLogado }: StoreTemplateProps) => {
  return (
    <div className="store-shell" id="home-section">
      <div className="glow glow--one" aria-hidden="true" />
      <div className="glow glow--two" aria-hidden="true" />
      <Header
        consulta={consulta}
        aoBuscar={aoBuscar}
        navegacaoAtiva={navegacaoAtiva}
        aoNavegar={aoNavegar}
        usuarioLogado={usuarioLogado}
      />
      <main>{children}</main>
      <div id="contact-section">
        <Footer />
      </div>
    </div>
  );
};
