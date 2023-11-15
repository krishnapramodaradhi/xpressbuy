import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to='/' className={styles.container}>
      <span>xpress</span>
      <span>buy</span>
    </Link>
  );
};

export default Logo;
