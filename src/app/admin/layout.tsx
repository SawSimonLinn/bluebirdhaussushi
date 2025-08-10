export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex gap-4 mb-6">
        <a className="text-primary underline" href="/admin">
          Menu
        </a>
        <a className="text-primary underline" href="/admin/menu/new">
          New Item
        </a>
        <a className="text-primary underline" href="/admin/menu/bulk-upload">
          Bulk Upload
        </a>
      </nav>
      {children}
    </div>
  );
}
