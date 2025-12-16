import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../services/api';
import { clearAuth } from '../features/auth/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
    >
      Logout
    </button>
  );
}

export default LogoutButton;