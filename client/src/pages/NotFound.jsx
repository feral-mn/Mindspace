import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="px-5 py-32 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The link may be broken, or the page was moved.</p>
      <Link to="/" className="btn btn-primary mt-6">Back to home</Link>
    </div>
  );
}
