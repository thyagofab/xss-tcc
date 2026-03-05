import type { Product } from '../../types/domain';

interface ProductCardProps {
  product: Product & {
    price: string;
    oldPrice: string;
    savings: string;
    imageUrl: string;
  };
  aoSelecionar: (idProduto: number) => void;
}

export const ProductCard = ({ product, aoSelecionar }: ProductCardProps) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') {
      return;
    }

    target.dataset.fallbackApplied = 'true';
    target.src = '/image-224acc37069842568a859bd4cdd15ab8.webp';
  };

  return (
    <article className="deal-card" onClick={() => aoSelecionar(product.id)} role="button" tabIndex={0}>
      <div className="deal-card__badge">56% OFF</div>
      <div className="deal-card__image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" onError={handleImageError} />
      </div>
      <h4>{product.name}</h4>
      <p className="deal-card__price">
        {product.price} <span>{product.oldPrice}</span>
      </p>
      <p className="deal-card__save">Economia: {product.savings}</p>
      <div className="deal-card__hint">
        <small>Toque para abrir produto, comprar e avaliar</small>
      </div>
    </article>
  );
};