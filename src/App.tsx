import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User,
} from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";
import OrderHistory from "./components/OrderHistory";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("Firestore user:", userSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const newName = prompt("Enter your name:");

    if (!newName) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: newName,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.email) return;

    const confirmed = confirm("Are you sure you want to delete your account?");

    if (!confirmed) return;

    const password = prompt(
      "Please enter your password to confirm account deletion:",
    );

    if (!password) return;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);

      await reauthenticateWithCredential(user, credential);

      const userRef = doc(db, "users", user.uid);

      await deleteDoc(userRef);
      await deleteUser(user);

      alert("Account deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to delete account.");
    }
  };

  return (
    <>
      {user ? (
        <div className="user-section">
          <p>Logged in as: {user.email}</p>

          <button onClick={handleUpdateProfile}>Update Profile</button>

          <button onClick={handleDeleteAccount}>Delete Account</button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}

      <main className="store-layout">
        <div className="products-column">
          <ProductList />
        </div>

        <aside className="cart-column">
          <Cart />
        </aside>
      </main>
      <OrderHistory />
    </>
  );
}

export default App;
