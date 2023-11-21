import { useQuery } from '@tanstack/react-query';
import { FaCartShopping, FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { db } from '../config/db';
import { range } from '../utils';
import styles from './ProductDetail.module.css';
import Spinner from '../components/common/Spinner';
import { useRef } from 'react';

const ProductDetailPage = () => {
  const params = useParams();
  const quantityRef = useRef();
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

  const addToCartHandler = async () => {
    const quantity = +quantityRef.current.value;
    const userId = localStorage.getItem('userId');
    const productId = params.productId
    console.log(quantity, userId, productId)
    const { data } = await db
      .from('cartItems')
      .select()
      .eq('productId', productId);
    if (data.length) {
      const result = await db
        .from('cartItems')
        .update({
          quantity: data[0].quantity + quantity,
          totalPrice: data[0].totalPrice + (product[0].price * quantity),
        }).and;
        console.log(result)
      return;
    }
    const cartItem = {
      userId: localStorage.getItem('userId'),
      productId: params.productId,
      quantity: +quantityRef.current.value,
      totalPrice: product[0].price * quantityRef.current.value,
    };
    const result = await db.from('cartItems').insert(cartItem);
  };

  if (isPending) return <Spinner />;

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
            <select name='quantity' id='quantity' ref={quantityRef}>
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
          <button onClick={addToCartHandler}>
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
