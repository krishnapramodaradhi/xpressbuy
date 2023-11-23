import { Link } from 'react-router-dom';
import QuantitySelect from '../components/QuantitySelect';
import styles from './Cart.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { db } from '../config/db';
import Spinner from '../components/common/Spinner';

const CartPage = () => {
  const { isPending, data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await db
        .from('cartItems')
        .select('id, quantity, totalPrice, products(*), createdAt')
        .order('createdAt', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const queryClient = useQueryClient();
  const updateCart = useMutation({
    mutationFn: ({ updatedColumns, cartId }) => {
      return db.from('cartItems').update(updatedColumns).eq('id', cartId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  const removeFromCart = useMutation({
    mutationFn: (id) => {
      return db.from('cartItems').delete().eq('id', id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const quantityChangedHandler = (e, itemIndex, cartId) => {
    const quantity = +e.target.value;
    const updatedColumns = {
      quantity,
      totalPrice: quantity * cartData[itemIndex].products.price,
    };
    updateCart.mutate({ updatedColumns, cartId });
  };

  if (isPending) return <Spinner />;

  console.log(cartData);

  const totalCartPrice = cartData
    .reduce((init, curr) => {
      return init + curr.totalPrice;
    }, 0)
    .toFixed(2);
  return (
    <>
      <h1>Cart ({cartData.length})</h1>
      {cartData?.length === 0 ? (
        <p>Please add items into the cart</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.cartItemsContainer}>
            {cartData.map((cartItem, i) => (
              <div key={cartItem.id} className={styles.cartItem}>
                <div>
                  <img
                    src={cartItem.products.imageUrl}
                    alt={cartItem.products.title}
                  />
                </div>
                <div>
                  <h3>{cartItem.products.title}</h3>
                  <p>{cartItem.products.shortDescription}</p>
                  <div>
                    <QuantitySelect
                      id={`quantity-${cartItem.id}`}
                      name='quantity'
                      label='Quantity'
                      maxRange={10}
                      value={cartItem.quantity}
                      onChange={(e) =>
                        quantityChangedHandler(e, i, cartItem.id)
                      }
                    />
                    <span>
                      {cartItem.products.quantity - cartItem.quantity} items
                      left
                    </span>
                  </div>
                  <p>${cartItem.totalPrice}</p>
                  <button onClick={() => removeFromCart.mutate(cartItem.id)}>
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.checkoutContainer}>
            <h2>Total price</h2>
            <p>${totalCartPrice}</p>
            <Link to='/checkout'>Proceed to checkout</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
