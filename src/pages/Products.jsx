import { useQuery } from '@tanstack/react-query';
import { db } from '../config/db';
import styles from './Products.module.css';
import Categories from '../components/products/Categories';
import ProductsGrid from '../components/products/ProductsGrid';
import { useEffect, useState } from 'react';
import CategoryFilter from '../components/products/CategoryFilter';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const setFilteredProductsByCategory = (category) => {
    const filteredProductsByCategory = fetchedProducts.filter(
      (p) => p.category.categoryName === category
    );
    setFilteredProducts([...filteredProducts, ...filteredProductsByCategory]);
  };

  useEffect(() => {
    const categories = searchParams.get('categories');
    if (categories && fetchedProducts) {
      setFilteredProducts(
        fetchedProducts.filter((p) =>
          categories.split(',').includes(p.category.categoryName)
        )
      );
    }
  }, [fetchedProducts]);

  const categorySelectHandler = (category) => {
    setSearchParams((prevParams) => {
      let categories = prevParams.get('categories');
      if (!categories) {
        prevParams.set('categories', category);
        setFilteredProductsByCategory(category);
        return prevParams;
      } else if (categories && categories.includes(category)) {
        return prevParams;
      } else {
        setFilteredProductsByCategory(category);
        categories = categories + ',' + category;
        prevParams.set('categories', categories);
        return prevParams;
      }
    });
  };

  const removeCategoryFilterHandler = (category) => {
    setSearchParams((prevParams) => {
      let categories = searchParams.get('categories');
      categories = categories
        .split(',')
        .filter((cat) => cat !== category)
        .join(',');
      prevParams.set('categories', categories);
      return prevParams;
    });
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
          selectedCategories={searchParams.get('categories')}
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
