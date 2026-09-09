import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <main className="store-layout">
      <div className="products-column">
        <ProductList />
      </div>

      <aside className="cart-column">
        <Cart />
      </aside>
    </main>
  );
}

export default App;
