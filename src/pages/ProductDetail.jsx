import { useQuery } from '@tanstack/react-query';
import { FaCartShopping, FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { db } from '../config/db';
import { range } from '../utils';
import styles from './ProductDetail.module.css';

const ProductDetailPage = () => {
  const params = useParams();
  const { isPending, data: product } = useQuery({
    queryKey: ['products', params.productId],
    queryFn: async () => {
      const { data, error } = await db
        .from('products')
        .select()
        .eq('id', params.productId);
      if (error) throw error;
      return data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  const quantity = product[0].quantity <= 10 ? product[0].quantity : 10;
  return (
    <div className={styles.gridContainer}>
      <div>
        <img src={product[0].imageUrl} alt={product[0].title} />
      </div>
      <div className={styles.contentContainer}>
        <div>
          <h1>{product[0].title}</h1>
          <p>${product[0].price}</p>
          <div className={styles.quantity}>
            <label htmlFor='quantity'>Quantity</label>
            <select name='quantity' id='quantity'>
              {range(1, quantity).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <p>{product[0].shortDescription}</p>
        </div>
        <div>
          <button>
            <span>Add to Cart</span>
            <FaCartShopping />
          </button>
          <button>
            <span>Add to Wishlist</span>
            <FaRegHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
