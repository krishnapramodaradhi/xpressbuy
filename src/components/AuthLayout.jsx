import { Navigate, Outlet } from 'react-router-dom';
import Logo from './common/Logo';
import styles from './AuthLayout.module.css';
import { Fragment } from 'react';

const AuthLayout = () => {
  const token = localStorage.getItem('token');
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default AuthLayout;
