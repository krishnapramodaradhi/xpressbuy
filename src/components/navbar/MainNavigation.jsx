import {
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import styles from './MainNavigation.module.css';
import Logo from '../common/Logo';
import NavList from './NavList';
import { useEffect, useState } from 'react';
import { db } from '../../config/db';
import { useQuery } from '@tanstack/react-query';

const MainNavigation = () => {
  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await db
        .from('cartItems')
        .select('id, quantity, totalPrice, products(*)')
        .order('createdAt', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const [session, setSession] = useState(null);
  const [cartCount, setCartCount] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    setSession(token);
    const { data } = db.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setCartCount(null);
      }
    })
    if (cartData?.length) {
      setCartCount(cartData.length)
    } else {
      setCartCount(null)
    }
    return () => {
      data.subscription.unsubscribe();
    }
  }, [cartData])
  return (
    <nav className={styles.navbar}>
      <div>
        <Logo />
      </div>
      <div>
        <FaMagnifyingGlass />
        <input type='text' placeholder='Search for Products' />
      </div>
      <NavList session={session} cartCount={cartCount} />
    </nav>
  );
};

export default MainNavigation;
