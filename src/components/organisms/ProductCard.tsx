import type { Product } from '../../types/domain';

interface ProductCardProps {
  product: Product & {
    price: string;
    oldPrice: string;
    savings: string;
    imageLabel: string;
  };
  onOpen: (productId: number) => void;
}

export const ProductCard = ({ product, onOpen }: ProductCardProps) => {
  return (
    <article className="deal-card" onClick={() => onOpen(product.id)} role="button" tabIndex={0}>
      <div className="deal-card__badge">56% OFF</div>
      <div className="deal-card__image" aria-hidden="true">
        <span>{product.imageLabel}</span>
      </div>
      <h4>{product.name}</h4>
      <p className="deal-card__price">
        {product.price} <span>{product.oldPrice}</span>
      </p>
      <p className="deal-card__save">Save - {product.savings}</p>
      <div className="deal-card__hint">
        <small>Toque para abrir produto, comprar e avaliar</small>
      </div>
    </article>
  );
};