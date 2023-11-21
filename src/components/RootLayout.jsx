import { Outlet } from 'react-router-dom';
import MainNavigation from './navbar/MainNavigation';
import { Suspense } from 'react';
import Spinner from './common/Spinner';

const RootLayout = () => {
  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default RootLayout;
