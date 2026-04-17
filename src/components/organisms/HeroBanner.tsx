import { Button } from '../atoms/Button';

interface HeroBannerProps {
  onViewOffers: () => void;
  onViewCollections: () => void;
}

export const HeroBanner = ({ onViewOffers, onViewCollections }: HeroBannerProps) => {
  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <h2>Tecnologia com performance para estudar, trabalhar e testar.</h2>
        <p>
          Explore um catalogo moderno com foco em notebooks, monitores e setups completos.
          Layout pensado para seu TCC com visual de produto real.
        </p>
        <div className="hero-banner__actions">
          <Button type="button" variant="primary" onClick={onViewOffers}>Ver ofertas</Button>
          <Button type="button" variant="ghost" onClick={onViewCollections}>Colecoes</Button>
        </div>
      </div>

      <aside className="hero-banner__highlight">
        <h3>Destaques da loja</h3>
        <p>Selecao com notebooks, smartphones e perifericos para todos os perfis.</p>
        <strong>Novidades toda semana</strong>
      </aside>
    </section>
  );
};
