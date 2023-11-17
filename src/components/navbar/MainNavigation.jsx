import {
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import styles from './MainNavigation.module.css';
import Logo from '../common/Logo';
import NavList from './NavList';
import { useEffect, useState } from 'react';
import { db } from '../../config/db';

const MainNavigation = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getSession = async () => {
      const { data } = await db.auth.getSession();
      setUser(data?.session?.user);
    }
    getSession();
    const { data } = db.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    })

    return () => {
      data.subscription.unsubscribe();
    }
  }, [])
  return (
    <nav className={styles.navbar}>
      <div>
        <Logo />
      </div>
      <div>
        <FaMagnifyingGlass />
        <input type='text' placeholder='Search for Products' />
      </div>
      <NavList user={user} />
    </nav>
  );
};

export default MainNavigation;
