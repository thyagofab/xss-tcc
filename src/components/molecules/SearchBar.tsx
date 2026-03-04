import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';

interface SearchBarProps {
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({ defaultQuery = '', onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <TextInput
        id="product-search"
        name="q"
        placeholder="Buscar notebook, mouse, monitor..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Buscar produtos"
      />
      <Button type="submit" variant="primary">
        Buscar
      </Button>
    </form>
  );
};