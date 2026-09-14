import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const Cart = () => {
  const dispatch = useDispatch();
  const [checkedOut, setCheckedOut] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!auth.currentUser) {
      alert("Please log in before checking out.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        products: cartItems,
        totalItems,
        totalPrice,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());
      sessionStorage.removeItem("cart");

      setCheckedOut(true);

      setTimeout(() => {
        setCheckedOut(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    }
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
                <img
                  className="cart-image"
                  src={item.image}
                  alt={item.title}
                  onError={(event) => {
                    const img = event.currentTarget;

                    if (img.dataset.fallback) return;

                    img.dataset.fallback = "true";
                    img.src = "https://placehold.co/300";
                  }}
                />
              </div>

              <div className="cart-item-info">
                <h3>{item.title}</h3>

                <p className="cart-item-price">${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                  >
                    +
                  </button>
                </div>

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

      {checkedOut && <p className="checkout-success">Checkout successful!</p>}
      <button
        className="checkout-button"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Checkout
      </button>

      <button className="clear-cart-button" onClick={handleClearCart}>
        Clear Cart
      </button>
    </section>
  );
};

export default Cart;
