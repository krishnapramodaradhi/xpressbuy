import MainNavigation from './components/navbar/MainNavigation';
import ProductsPage from './pages/Products';

const App = () => {
  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main>
        <ProductsPage />
      </main>
    </>
  );
};

export default App;
