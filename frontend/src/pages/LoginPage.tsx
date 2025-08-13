import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleLogin = () => {
    login();
    navigate(from);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          Login (Demo)
        </button>
      </div>
    </div>
  );
};

export default LoginPage;