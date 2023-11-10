import {
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import styles from './MainNavigation.module.css';
import Logo from '../common/Logo';
import NavList from './NavList';

const MainNavigation = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Logo />
      </div>
      <div>
        <FaMagnifyingGlass />
        <input type='text' placeholder='Search for Products' />
      </div>
      <NavList />
    </nav>
  );
};

export default MainNavigation;
