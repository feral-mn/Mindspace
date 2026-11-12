// One saved link. Pass onDelete to show the remove button (owner view only).
export default function ItemCard({ item, onDelete }) {
  return (
    <article className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-line bg-surface">
      {item.thumbnail && (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <img src={item.thumbnail} alt="" loading="lazy" className="w-full object-cover" />
        </a>
      )}
      <div className="p-4">
        <p className="mb-1 text-xs text-muted">{item.siteName}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-lg font-medium leading-snug hover:text-accent"
        >
          {item.title || item.url}
        </a>
        {item.description && <p className="mt-1.5 line-clamp-3 text-sm text-muted">{item.description}</p>}
        {item.note && <p className="marker-note mt-3">{item.note}</p>}
        {onDelete && (
          <button onClick={() => onDelete(item._id)} className="btn btn-danger mt-3 !px-2 !py-1 text-xs">
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
