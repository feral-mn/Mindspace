import { Link } from 'react-router-dom';

export default function MindspaceCard({ mindspace }) {
  return (
    <Link
      to={`/app/mindspaces/${mindspace._id}`}
      className="block rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="text-3xl">{mindspace.emoji}</div>
      <h3 className="mt-3 text-xl font-bold">{mindspace.name}</h3>
      {mindspace.description && <p className="mt-1 line-clamp-2 text-sm text-muted">{mindspace.description}</p>}
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        {mindspace.itemCount} {mindspace.itemCount === 1 ? 'link' : 'links'}
        {mindspace.isPublic && <span className="rounded bg-marker/40 px-1.5 py-0.5 text-ink">Shared</span>}
      </p>
    </Link>
  );
}
