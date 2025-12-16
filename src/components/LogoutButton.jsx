import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
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
