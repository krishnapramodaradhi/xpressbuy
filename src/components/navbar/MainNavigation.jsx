import {
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import styles from './MainNavigation.module.css';
import Logo from '../common/Logo';
import NavList from './NavList';
import { useEffect, useState } from 'react';
import { db } from '../../config/db';

const MainNavigation = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token')
    setSession(token);
    const { data } = db.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
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
      <NavList session={session} />
    </nav>
  );
};

export default MainNavigation;
