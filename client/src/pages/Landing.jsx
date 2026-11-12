import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SAMPLE = [
  { site: 'youtube.com', title: 'How to build a capsule wardrobe', note: 'good for basics', tone: 'bg-accent/20' },
  { site: 'pinterest.com', title: 'Layered fall outfits', note: '', tone: 'bg-marker/40' },
  { site: 'x.com', title: 'Thrift haul thread', note: 'check sizing tips', tone: 'bg-ink/10' },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <nav className="flex items-center justify-between">
        <span className="font-display text-xl font-bold">Mindspace</span>
        <div className="flex gap-3">
          {user ? (
            <Link to="/app" className="btn btn-primary">Open your spaces</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Log in</Link>
              <Link to="/register" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <section className="grid items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-[1.05]">
            One place for every link you meant to come back to.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Group videos, threads, pins and articles into named spaces, like “Fit Ideas”.
            Share a whole space with friends in one link.
          </p>
          <Link to="/register" className="btn btn-primary mt-8 !px-6 !py-3">Create your first space</Link>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="mb-4 font-display text-lg font-bold">🧥 Fit Ideas</p>
          <div className="space-y-3">
            {SAMPLE.map((s) => (
              <div key={s.title} className="flex gap-3 rounded-lg border border-line p-3">
                <div className={`h-14 w-20 shrink-0 rounded-md ${s.tone}`} />
                <div className="min-w-0">
                  <p className="text-xs text-muted">{s.site}</p>
                  <p className="truncate text-sm font-semibold">{s.title}</p>
                  {s.note && <p className="marker-note mt-1 inline-block !py-0.5 text-xs">{s.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
