import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { shareApi } from '../api/mindspace.api';
import { getErrorMessage } from '../api/client';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';

export default function SharedMindspace() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    shareApi.get(slug).then(setData).catch((e) => setError(getErrorMessage(e)));
  }, [slug]);

  if (error) {
    return (
      <div className="px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">{error}</h1>
        <Link to="/" className="btn btn-ghost mt-6">Go to Mindspace</Link>
      </div>
    );
  }
  if (!data) return <Spinner fullscreen />;

  const { mindspace, items } = data;
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-bold">{mindspace.emoji} {mindspace.name}</h1>
      <p className="mt-1 text-muted">
        {mindspace.description ? `${mindspace.description} · ` : ''}Shared by {mindspace.ownerName}
      </p>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        Want your own? <Link to="/register" className="font-semibold text-accent">Start a Mindspace</Link>
      </p>
    </div>
  );
}
