import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <Link to="/" className="mb-8 font-display text-2xl font-bold">Mindspace</Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7">
        <Outlet />
      </div>
    </div>
  );
}
