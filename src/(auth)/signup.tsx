'use client'
import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../../utils/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerUser(username, password);

    if (result.success) {
      setMessage("User registered successfully!");
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } else {
      setMessage("Registration failed!");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
