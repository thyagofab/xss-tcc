const categorias = [
  'Todos',
  'Cadernos',
  'Smartphones',
  'Notebooks',
  'Monitores',
  'Perifericos',
  'Acessorios'
];

interface CategoryTabsProps {
  categoriaSelecionada: string;
  aoSelecionarCategoria: (categoria: string) => void;
}

export const CategoryTabs = ({ categoriaSelecionada, aoSelecionarCategoria }: CategoryTabsProps) => {
  return (
    <div className="category-tabs" aria-label="Categorias">
      {categorias.map((categoria) => (
        <button
          type="button"
          key={categoria}
          className={`category-tabs__item ${categoriaSelecionada === categoria ? 'is-active' : ''}`}
          onClick={() => aoSelecionarCategoria(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
};
