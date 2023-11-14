import { useQuery } from '@tanstack/react-query';
import { db } from '../config/db';
import styles from './Products.module.css';
import Categories from '../components/products/Categories';
import ProductsGrid from '../components/products/ProductsGrid';
import { useState } from 'react';
import CategoryFilter from '../components/products/CategoryFilter';

const ProductsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isPending: loadingProducts, data: fetchedProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await db
        .from('products')
        .select('id, title, price, imageUrl, category (categoryName)');
      if (error) throw error;
      return data;
    },
  });

  let products = fetchedProducts;
  if (filteredProducts.length) {
    products = filteredProducts;
  }

  const { isPending: loadingCategories, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await db.from('categories').select();
      if (error) throw error;
      return data;
    },
  });

  const categorySelectHandler = (category) => {
    if (selectedCategories.includes(category)) return;
    setSelectedCategories([...selectedCategories, category]);
    const filteredProductsByCategory = fetchedProducts.filter(
      (p) => p.category.categoryName === category
    );
    setFilteredProducts([...filteredProducts, ...filteredProductsByCategory]);
  };

  const removeCategoryFilterHandler = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    setFilteredProducts(
      filteredProducts.filter((p) => p.category.categoryName !== category)
    );
  };

  return (
    <div className={styles.productsContainer}>
      <Categories
        loading={loadingCategories}
        categories={categories}
        onCategorySelect={categorySelectHandler}
      />
      <section>
        <CategoryFilter
          selectedCategories={selectedCategories}
          onRemoveCategoryFilter={removeCategoryFilterHandler}
        />
        <ProductsGrid loading={loadingProducts} products={products} />
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
