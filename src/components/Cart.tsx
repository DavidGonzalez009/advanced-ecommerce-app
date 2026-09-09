import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearCart, removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    dispatch(clearCart());
    sessionStorage.removeItem("cart");
    alert("Checkout successful!");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    sessionStorage.removeItem("cart");
  };

  return (
    <section className="cart-section">
      <div className="cart-header">
        <div>
          <h2>Shopping Cart</h2>
          <p>{totalItems} items in your cart</p>
        </div>

        <span className="cart-badge">{totalItems}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-image-wrapper">
                <img className="cart-image" src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-info">
                <h3>{item.title}</h3>

                <p className="cart-item-price">${item.price.toFixed(2)}</p>

                <p className="cart-item-quantity">Quantity: {item.quantity}</p>

                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-row total-row">
          <span>Total Price</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>

      <button className="clear-cart-button" onClick={handleClearCart}>
        Clear Cart
      </button>
    </section>
  );
};

export default Cart;
