import { useEffect, useState } from 'react';
import { db } from '../config/db';
import styles from './Products.module.css'

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);
    setLoadingCategories(true)
    const fetchProductsData = async () => {
      const {data, error} = await db.from('products').select('id, title, price, imageUrl');
      setProducts(data);
      setLoadingProducts(false);
    };

    const fetchCategoriesData = async () => {
        const {data, error} = await db.from('categories').select();
        setCategories(data);
        setLoadingCategories(false)
    }
    fetchProductsData();
    fetchCategoriesData();
  }, []);

  return (
    <div className={styles.productsContainer}>
      <section>
        <h3>Categories</h3>
        <ul role='list'>
            {loadingCategories ? <p>Loading...</p> :categories.map(category => (
                <li key={category.categoryId}>{category.categoryName}</li>
            ))}
        </ul>
      </section>
      <section className={styles.cardContainer}>
        {loadingProducts ? <p>Loading...</p> :products.map(product => (
            <div key={product.id} className={styles.card}>
                <div>
                    <img src={product.imageUrl} alt={product.title} />
                </div>
                <div>
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                </div>
            </div>
        ))}
      </section>
      <section>
        <h3>Filters</h3>
        <ul role='list'>
            <li>Sort by Price: Highest</li>
            <li>Sort by Price: Lowest</li>
        </ul>
      </section>
    </div>
  );
};

export default ProductsPage;
