export default function Spinner({ fullscreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullscreen ? 'min-h-screen' : 'py-16'}`} role="status">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
