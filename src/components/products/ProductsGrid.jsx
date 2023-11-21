import { Link } from 'react-router-dom';
import Card from '../common/Card';
import styles from './ProductGrid.module.css';
import Spinner from '../common/Spinner';

const ProductsGrid = ({ loading, products }) => {
  return (
    <section className={styles.cardContainer}>
      {loading ? (
        <Spinner />
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
