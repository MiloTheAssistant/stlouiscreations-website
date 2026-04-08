import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="font-display text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-primary text-white font-display text-xs uppercase tracking-wider font-bold hover:shadow-glow transition-shadow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
