import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h2>Shopping Cart</h2>

      <p>Total Items: {cartItems.length}</p>

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
