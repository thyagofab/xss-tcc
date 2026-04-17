import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';

interface CommentFormProps {
  aoEnviar: (conteudo: string) => Promise<void>;
  desabilitado?: boolean;
}

export const CommentForm = ({ aoEnviar, desabilitado = false }: CommentFormProps) => {
  const [conteudo, setConteudo] = useState('');
  const [salvando, setSalvando] = useState(false);

  const aoSubmeter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!conteudo.trim() || desabilitado) {
      return;
    }

    setSalvando(true);
    try {
      await aoEnviar(conteudo);
      setConteudo('');
    } catch {
      // Erro de envio exibido pelo componente pai.
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={aoSubmeter}>
      <TextInput
        name="comment"
        placeholder={desabilitado ? 'Faca login para comentar' : 'Deixe um comentario'}
        value={conteudo}
        onChange={(event) => setConteudo(event.target.value)}
        disabled={desabilitado || salvando}
      />
      <Button type="submit" variant="danger" size="sm" disabled={salvando || desabilitado}>
        {salvando ? 'Salvando...' : 'Enviar'}
      </Button>
    </form>
  );
};
