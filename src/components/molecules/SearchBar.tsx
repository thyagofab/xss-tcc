import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';

interface SearchBarProps {
  consultaInicial?: string;
  aoBuscar: (consulta: string) => void;
}

export const SearchBar = ({ consultaInicial = '', aoBuscar }: SearchBarProps) => {
  const [consulta, setConsulta] = useState(consultaInicial);

  const aoEnviar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    aoBuscar(consulta);
  };

  return (
    <form className="search-bar" onSubmit={aoEnviar}>
      <TextInput
        id="product-search"
        name="q"
        placeholder="Buscar notebook, mouse, monitor..."
        value={consulta}
        onChange={(event) => setConsulta(event.target.value)}
        aria-label="Buscar produtos"
      />
      <Button type="submit" variant="primary">
        Buscar
      </Button>
    </form>
  );
};