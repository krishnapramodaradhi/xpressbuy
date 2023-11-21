import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const session = localStorage.getItem('token');
  return (
    <Fragment>
      {session ? (
        <Outlet />
      ) : (
        <Navigate
          to='/login'
          state={{ message: 'Please login before continuing...', pathname: location.pathname }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedLayout;
