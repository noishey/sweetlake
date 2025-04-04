'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GradientBackground } from '@/components/backgrounds/gradient-background';

interface AuthFormProps {
  type: 'signup' | 'login';
}

const greetings = [
  'Hola!',
  'Hello!',
  'Bonjour!',
  'नमस्ते!',
  'Ciao!',
  'こんにちは!',
  '안녕하세요!',
  'مرحبا!',
  'Olá!',
  'Hallo!',
];

function MultilingualGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={greetings[index]}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full text-3xl font-bold text-center text-[#2c5364]"
        >
          {greetings[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <GradientBackground className="opacity-95" />
      <div className="max-w-md w-full mx-auto p-8 bg-[#0f2027]/80 backdrop-blur-lg rounded-xl shadow-2xl border border-[#2c5364]/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#2c5364]">
          {type === 'signup' ? 'Create Account' : <MultilingualGreeting />}
        </h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#203a43]/50 border-[#2c5364]/30 text-white placeholder:text-white/60"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#203a43]/50 border-[#2c5364]/30 text-white placeholder:text-white/60"
          />
          <Button
            type="submit"
            className="w-full bg-[#2c5364] hover:bg-[#203a43] text-white border border-[#2c5364]"
          >
            {type === 'signup' ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <p className="text-center mt-6 text-[#2c5364]/80">
          {type === 'signup' ? 'Already have an account?' : 'Don’t have an account?'}
          <a
            href={type === 'signup' ? '/login' : '/signup'}
            className="text-[#2c5364] ml-1 hover:text-[#203a43]"
          >
            {type === 'signup' ? 'Login' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
