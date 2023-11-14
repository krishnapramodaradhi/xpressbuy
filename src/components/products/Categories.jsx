import styles from './Categories.module.css';

const Categories = ({ loading, categories, onCategorySelect }) => {
  return (
    <section className={styles.container}>
      <h3>Categories</h3>
      <ul role='list'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map((category) => (
            <li
              key={category.categoryId}
              onClick={onCategorySelect.bind(null, category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Categories;
