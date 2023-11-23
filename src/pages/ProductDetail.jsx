import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCartShopping, FaRegHeart } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/db';
import { range } from '../utils';
import styles from './ProductDetail.module.css';
import Spinner from '../components/common/Spinner';
import { useRef } from 'react';
import QuantitySelect from '../components/QuantitySelect';

const ProductDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationFn: (cartItem) => {
      return db.from('cartItems').insert(cartItem)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart']
      })
    },
  })

  const updateCart = useMutation({
    mutationFn: ({ updatedColumns, productId }) => {
      return db
      .from('cartItems')
      .update(updatedColumns)
      .eq('productId', productId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const addToCartHandler = async () => {
    const quantity = +quantityRef.current.value;
    const userId = localStorage.getItem('userId');
    const productId = params.productId;
    const { data } = await db
      .from('cartItems')
      .select()
      .eq('productId', productId);
    if (data.length) {
      const updatedColumns = {
        quantity: data[0].quantity + quantity,
        totalPrice: data[0].totalPrice + product[0].price * quantity,
      }
      updateCart.mutate({ updatedColumns, productId })
      navigate('/cart');
      return;
    }
    const cartItem = {
      user_id: userId,
      productId,
      quantity,
      totalPrice: product[0].price * quantity,
    };
    addToCart.mutate(cartItem)
    navigate('/cart');
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
          <QuantitySelect
            id='quantity'
            name='quantity'
            label='Quantity'
            ref={quantityRef}
            maxRange={quantity}
          />
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
