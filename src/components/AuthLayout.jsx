import { Navigate, Outlet } from 'react-router-dom';
import Logo from './common/Logo';
import styles from './AuthLayout.module.css';
import { Fragment, Suspense } from 'react';
import Spinner from './common/Spinner';

const AuthLayout = () => {
  const token = localStorage.getItem('token');
  return (
    <Suspense fallback={<Spinner />}>
      {!token ? (
        <div>
          <div className={styles.container}>
            <Logo />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </Suspense>
  );
};

export default AuthLayout;
