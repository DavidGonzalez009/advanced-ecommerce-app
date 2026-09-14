import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to log in.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
