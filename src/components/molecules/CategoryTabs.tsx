const categories = [
  'Todos',
  'Cadernos',
  'Smartphones',
  'Notebooks',
  'Monitores',
  'Perifericos',
  'Acessorios'
];

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <div className="category-tabs" aria-label="Categorias">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={`category-tabs__item ${selectedCategory === category ? 'is-active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
