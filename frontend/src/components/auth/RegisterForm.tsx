// src/components/RegisterForm.tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onClose?: () => void;
  switchToLogin?: () => void;
}

const RegisterForm = ({ onClose, switchToLogin }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setLocalError("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    const success = await register(email, password);
    if (success) {
      onClose?.();
      navigate('/');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>
      
      {(error || localError) && (
        <div className="text-red-500 text-sm text-center">{error || localError}</div>
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
            minLength={6}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>

      {switchToLogin && (
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <button 
              onClick={switchToLogin}
              className="text-emerald-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;