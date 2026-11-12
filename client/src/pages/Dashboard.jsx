import { useEffect, useState } from 'react';
import { mindspaceApi } from '../api/mindspace.api';
import { getErrorMessage } from '../api/client';
import MindspaceCard from '../components/MindspaceCard';
import Spinner from '../components/Spinner';

export default function Dashboard() {
  const [mindspaces, setMindspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', emoji: '🧠', description: '' });

  useEffect(() => {
    mindspaceApi
      .list()
      .then((d) => setMindspaces(d.mindspaces))
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    try {
      const { mindspace } = await mindspaceApi.create(form);
      setMindspaces((prev) => [mindspace, ...prev]);
      setForm({ name: '', emoji: '🧠', description: '' });
      setShowForm(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your spaces</h1>
        <button className="btn btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : 'New space'}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-danger" role="alert">{error}</p>}

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 grid gap-3 rounded-xl border border-line bg-surface p-5 sm:grid-cols-[5rem_1fr]">
          <input className="input text-center text-xl" maxLength={4} value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} aria-label="Emoji" />
          <input className="input" required placeholder="Name, e.g. Fit Ideas" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Name" />
          <input className="input sm:col-span-2" placeholder="What goes in here? (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} aria-label="Description" />
          <button className="btn btn-primary sm:col-span-2">Create space</button>
        </form>
      )}

      {mindspaces.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl font-bold">No spaces yet</p>
          <p className="mt-1 text-sm text-muted">Create one, then start pasting links into it.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mindspaces.map((m) => <MindspaceCard key={m._id} mindspace={m} />)}
        </div>
      )}
    </div>
  );
}
