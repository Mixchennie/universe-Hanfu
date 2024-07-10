// src/auth/signin.tsx

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      window.location.href = '/';
    } else {
      console.error(result.error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
