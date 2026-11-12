import { useState } from 'react';
import { itemApi } from '../api/mindspace.api';
import { getErrorMessage } from '../api/client';

export default function AddLinkForm({ mindspaceId, onAdded }) {
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { item } = await itemApi.add(mindspaceId, { url, note });
      onAdded(item);
      setUrl('');
      setNote('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-line bg-surface p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="input"
          type="url"
          required
          placeholder="Paste a link (YouTube, X, Pinterest, any page)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Link"
        />
        <input
          className="input sm:max-w-xs"
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          aria-label="Note"
        />
        <button className="btn btn-primary shrink-0" disabled={saving}>
          {saving ? 'Saving…' : 'Save link'}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-danger" role="alert">{error}</p>}
    </form>
  );
}
