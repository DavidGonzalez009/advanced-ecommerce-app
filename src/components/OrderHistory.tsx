import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  type Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";
import type { CartItem } from "../redux/cartSlice";

interface Order {
  id: string;
  userId: string;
  userEmail: string | null;
  products: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Timestamp | null;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setOrders([]);
        return;
      }

      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
      );

      const querySnapshot = await getDocs(ordersQuery);

      const userOrders = querySnapshot.docs.map((orderDoc) => ({
        id: orderDoc.id,
        ...orderDoc.data(),
      })) as Order[];

      userOrders.sort(
        (a, b) =>
          (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0),
      );

      setOrders(userOrders);
    });

    return () => unsubscribe();
  }, []);

  if (!auth.currentUser) {
    return null;
  }

  return (
    <section>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt
                ? order.createdAt.toDate().toLocaleString()
                : "Pending"}
            </p>

            <p>
              <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
            </p>

            <button
              onClick={() =>
                setSelectedOrderId(
                  selectedOrderId === order.id ? null : order.id,
                )
              }
            >
              {selectedOrderId === order.id ? "Hide Details" : "View Details"}
            </button>

            {selectedOrderId === order.id && (
              <div>
                <h3>Order Details</h3>

                {order.products.map((product) => (
                  <div key={product.id}>
                    <p>{product.title}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>
                      Price: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <p>
                  <strong>Total Items:</strong> {order.totalItems}
                </p>

                <p>
                  <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </section>
  );
};

export default OrderHistory;
