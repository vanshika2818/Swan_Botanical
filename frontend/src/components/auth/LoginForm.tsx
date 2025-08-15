// src/components/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onClose?: () => void;
  switchToRegister?: () => void;
}

const LoginForm = ({ onClose, switchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      onClose?.();
      navigate('/');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {switchToRegister && (
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <button 
              onClick={switchToRegister}
              className="text-emerald-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm; 