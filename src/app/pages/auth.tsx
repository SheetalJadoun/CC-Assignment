import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 mb-4"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 text-white p-2"
      >
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;