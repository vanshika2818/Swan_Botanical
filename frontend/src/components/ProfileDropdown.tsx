// src/components/ProfileDropdown.tsx
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <button className="flex items-center gap-1">
        <span className="material-icons">account_circle</span>
        <span className="hidden md:inline">{user?.name || 'Account'}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
        {isAuthenticated ? (
          <>
            <div className="px-4 py-2 border-b">
              <p className="font-medium">Hi, {user?.name}!</p>
            </div>
            <Link 
              to="/orders" 
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Orders
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;