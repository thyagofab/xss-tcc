import type { Product } from '../../types/domain';

interface ProductCardProps {
  product: Product & {
    price: string;
    oldPrice?: string;
    savings?: string;
    discountLabel?: string;
    imageUrl: string;
  };
  aoSelecionar: (idProduto: number) => void;
}

export const ProductCard = ({ product, aoSelecionar }: ProductCardProps) => {
  const possuiDesconto = Boolean(product.savings);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') {
      return;
    }

    target.dataset.fallbackApplied = 'true';
    target.src = '/image-224acc37069842568a859bd4cdd15ab8.webp';
  };

  return (
    <article
      className={`deal-card ${possuiDesconto ? '' : 'deal-card--sem-desconto'}`.trim()}
      onClick={() => aoSelecionar(product.id)}
      role="button"
      tabIndex={0}
    >
      {product.discountLabel ? <div className="deal-card__badge">{product.discountLabel}</div> : null}
      <div className="deal-card__image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" onError={handleImageError} />
      </div>
      <h4>{product.name}</h4>
      <p className="deal-card__price">
        {product.price} {product.oldPrice ? <span>{product.oldPrice}</span> : null}
      </p>
      {product.savings ? <p className="deal-card__save">Economia: {product.savings}</p> : null}
      <div className="deal-card__hint">
        <small>Toque para abrir produto, comprar e avaliar</small>
      </div>
    </article>
  );
};