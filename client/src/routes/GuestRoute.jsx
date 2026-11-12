import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

// Login/Register are hidden from already-logged-in users.
export default function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner fullscreen />;
  if (user) return <Navigate to="/app" replace />;
  return <Outlet />;
}
