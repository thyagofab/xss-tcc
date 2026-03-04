const promoItems = [
  {
    title: 'Frete para capitais',
    description: 'Entrega agil para todo Brasil com rastreio.'
  },
  {
    title: 'Garantia estendida',
    description: 'Cobertura adicional para dispositivos premium.'
  },
  {
    title: 'Curadoria de setup',
    description: 'Combos montados para desenvolvedores e gamers.'
  }
];

export const PromoStrip = () => {
  return (
    <section className="promo-strip" aria-label="Beneficios da loja">
      {promoItems.map((item) => (
        <article key={item.title} className="promo-strip__item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
};
