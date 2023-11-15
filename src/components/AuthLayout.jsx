import { Outlet } from 'react-router-dom';
import Logo from './common/Logo';
import styles from './AuthLayout.module.css';

const AuthLayout = () => {
  return (
    <div>
      <div className={styles.container}>
        <Logo />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
