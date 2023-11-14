import { Outlet } from 'react-router-dom';
import MainNavigation from './navbar/MainNavigation';

const RootLayout = () => {
  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
