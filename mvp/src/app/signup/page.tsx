'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  type: 'signup' | 'login';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Mock API call (Replace with actual API call)
    try {
      if (email && password) {
        alert(`${type} successful!`);
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{type === 'signup' ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">{type === 'signup' ? 'Sign Up' : 'Login'}</Button>
      </form>
      <p className="text-center mt-4">
        {type === 'signup' ? 'Already have an account?' : 'Dont have an account?'}
        <a
          href={type === 'signup' ? '/login' : '/signup'}
          className="text-blue-500 ml-1"
        >
          {type === 'signup' ? 'Login' : 'Sign Up'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
