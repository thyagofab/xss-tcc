import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(content);
      setContent('');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <TextInput
        name="comment"
        placeholder="Deixe um comentario (campo vulneravel para estudo)"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <Button type="submit" variant="danger" size="sm" disabled={isSaving}>
        {isSaving ? 'Salvando...' : 'Enviar'}
      </Button>
    </form>
  );
};
