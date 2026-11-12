import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input id="name" name="name" required className="input" value={form.name} onChange={onChange} />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="input" value={form.email} onChange={onChange} />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} className="input" value={form.password} onChange={onChange} />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      {error && <p className="text-sm text-danger" role="alert">{error}</p>}
      <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating…' : 'Sign up'}</button>
      <p className="text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="font-semibold text-accent">Log in</Link>
      </p>
    </form>
  );
}
