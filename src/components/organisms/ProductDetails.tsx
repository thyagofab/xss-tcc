import { useState } from 'react';
import type { Product } from '../../types/domain';
import { Button } from '../atoms/Button';
import { VulnerableHtml } from '../atoms/VulnerableHtml';
import { CommentForm } from '../molecules/CommentForm';

interface ProductDetailsProps {
  product: Product & {
    price: string;
    oldPrice: string;
    savings: string;
    imageLabel: string;
    buyLink: string;
  };
  onBack: () => void;
  onAddComment: (productId: number, content: string) => Promise<void>;
}

export const ProductDetails = ({ product, onBack, onAddComment }: ProductDetailsProps) => {
  const [rating, setRating] = useState(4);

  return (
    <section className="product-details">
      <button type="button" className="back-link" onClick={onBack}>
        {'<- Voltar para vitrine'}
      </button>

      <div className="product-details__layout">
        <div className="product-details__media" aria-hidden="true">
          <span>{product.imageLabel}</span>
          <small>Area de imagem aberta: substitua pela foto final do produto</small>
        </div>

        <div className="product-details__content">
          <p className="kicker">Detalhes do produto</p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="deal-card__price detail-price">
            {product.price} <span>{product.oldPrice}</span>
          </p>
          <p className="deal-card__save">Economia estimada: {product.savings}</p>

          <div className="rating-box">
            <strong>Avaliar produto</strong>
            <div className="rating-stars" role="radiogroup" aria-label="Avaliacao">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${rating >= star ? 'is-on' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <small>Sua nota atual: {rating}/5</small>
          </div>

          <div className="detail-actions">
            <a href={product.buyLink} target="_blank" rel="noreferrer">
              <Button type="button" variant="primary">Ir para compra</Button>
            </a>
            <Button type="button" variant="ghost" onClick={onBack}>
              Continuar navegando
            </Button>
          </div>
        </div>
      </div>

      <section className="comments-section detail-comments">
        <h3>Comentarios e reviews (Stored XSS)</h3>
        <CommentForm onSubmit={(content) => onAddComment(product.id, content)} />
        {product.comments.length === 0 ? (
          <p className="empty-state">Nenhum comentario ainda.</p>
        ) : (
          product.comments.map((comment) => (
            <div key={comment.id} className="comment-bubble">
              <VulnerableHtml content={comment.content} className="comment-content" />
            </div>
          ))
        )}
      </section>
    </section>
  );
};
