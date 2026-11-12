import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { itemApi, mindspaceApi } from '../api/mindspace.api';
import { getErrorMessage } from '../api/client';
import AddLinkForm from '../components/AddLinkForm';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';

export default function MindspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mindspace, setMindspace] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    mindspaceApi
      .get(id)
      .then((d) => { setMindspace(d.mindspace); setItems(d.items); })
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const shareUrl = mindspace ? `${window.location.origin}/m/${mindspace.shareSlug}` : '';

  async function handleToggleShare() {
    const { mindspace: updated } = await mindspaceApi.toggleShare(id);
    setMindspace(updated);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleDeleteItem(itemId) {
    await itemApi.remove(itemId);
    setItems((prev) => prev.filter((i) => i._id !== itemId));
  }

  async function handleDeleteSpace() {
    if (!window.confirm(`Delete “${mindspace.name}” and all its links?`)) return;
    await mindspaceApi.remove(id);
    navigate('/app', { replace: true });
  }

  if (loading) return <Spinner />;
  if (error) return <p className="text-danger" role="alert">{error}</p>;

  return (
    <div>
      <Link to="/app" className="text-sm text-muted hover:text-ink">Back to spaces</Link>

      <div className="mb-8 mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">{mindspace.emoji} {mindspace.name}</h1>
          {mindspace.description && <p className="mt-1 text-muted">{mindspace.description}</p>}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={handleToggleShare}>
            {mindspace.isPublic ? 'Stop sharing' : 'Share'}
          </button>
          <button className="btn btn-danger" onClick={handleDeleteSpace}>Delete</button>
        </div>
      </div>

      {mindspace.isPublic && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-marker/30 p-3 text-sm">
          <span className="min-w-0 flex-1 truncate">Anyone with this link can view: {shareUrl}</span>
          <button className="btn btn-ghost !py-1.5" onClick={copyLink}>{copied ? 'Copied' : 'Copy link'}</button>
        </div>
      )}

      <AddLinkForm mindspaceId={id} onAdded={(item) => setItems((prev) => [item, ...prev])} />

      {items.length === 0 ? (
        <p className="py-12 text-center text-muted">Nothing saved yet. Paste your first link above.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => <ItemCard key={item._id} item={item} onDelete={handleDeleteItem} />)}
        </div>
      )}
    </div>
  );
}
