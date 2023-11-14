import { Link } from 'react-router-dom';
import Card from '../common/Card';
import styles from './ProductGrid.module.css';

const ProductsGrid = ({ loading, products }) => {
  return (
    <section className={styles.cardContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => (
          <Link to={`products/${product.id}`} key={product.id}>
            <Card product={product} />
          </Link>
        ))
      )}
    </section>
  );
};

export default ProductsGrid;
