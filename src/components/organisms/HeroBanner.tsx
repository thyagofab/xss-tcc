import { Button } from '../atoms/Button';

interface HeroBannerProps {
  onViewOffers: () => void;
  onViewCollections: () => void;
}

export const HeroBanner = ({ onViewOffers, onViewCollections }: HeroBannerProps) => {
  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <p className="hero-banner__eyebrow">Colecao de abril</p>
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
        <p className="kicker">Oferta da semana</p>
        <h3>Notebook Nitro Vision 16</h3>
        <p>Processador de ultima geracao, 32GB RAM e GPU dedicada.</p>
        <strong>R$ 6.499,00</strong>
      </aside>
    </section>
  );
};
