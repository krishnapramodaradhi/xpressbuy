import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AuthLayout from './components/AuthLayout';
import ProtectedLayout from './components/ProtectedLayout';

const ProductsPage = lazy(() => import('./pages/Products'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/Login'));
const UserProfilePage = lazy(() => import('./pages/UserProfile'));
const CartPage = lazy(() => import('./pages/Cart'));
const WishlistPage = lazy(() => import('./pages/Wishlist'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const OrderDetailPage = lazy(() => import('./pages/OrderDetail'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path='/products/:productId' element={<ProductDetailPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailPage />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
