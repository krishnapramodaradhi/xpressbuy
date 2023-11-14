import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductsPage from './pages/Products';
import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetail';
import RootLayout from './components/RootLayout';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path='/products/:productId' element={<ProductDetailPage />} />
        </Route>
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
