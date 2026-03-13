import Link from "next/link";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex shrink-0 items-center border-b px-4 py-2">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>
      </header>
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
