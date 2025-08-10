"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// how many items per page
const PAGE_SIZE = 25;

const CATEGORY_LABELS: Record<string, string> = {
  appetizers: "Appetizers",
  salads: "Salads",
  traditionalRolls: "Traditional Rolls",
  delightfulRolls: "Delightful Rolls",
  nigiri: "Nigiri",
  ramen: "Ramen",
  sushiRiceBowl: "Sushi Rice Bowls",
  sashimi: "Sashimi",
};

export default function AdminHome() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  // Ask API for a page; if your GET route supports limit/offset it will return { total, documents }
  const { data, mutate, isLoading } = useSWR(
    `/api/menu?limit=${PAGE_SIZE}&offset=${offset}`,
    fetcher
  );

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
    else alert("Delete failed");
  }

  // Normalize results (handles both paged {documents,total} and plain arrays)
  const docs: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.documents)
    ? data.documents
    : [];
  const total: number =
    typeof data?.total === "number"
      ? data.total
      : Array.isArray(data)
      ? data.length
      : docs.length;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Group docs by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const item of docs) {
      const cat = item.category || "uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    // show in our preferred category order, then any unknowns
    const orderedKeys = [
      ...Object.keys(CATEGORY_LABELS),
      ...Array.from(map.keys()).filter((k) => !(k in CATEGORY_LABELS)),
    ];
    return orderedKeys
      .filter((k) => map.has(k))
      .map((k) => ({
        key: k,
        label: CATEGORY_LABELS[k] ?? k,
        items: map.get(k)!,
      }));
  }, [docs]);

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="space-y-6">
      {/* Header + pager */}
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <div className="text-sm">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong> •{" "}
            <span className="text-muted-foreground">{total} total</span>
          </div>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Grouped sections */}
      {grouped.length === 0 ? (
        <div className="border rounded p-4 text-sm">No items yet.</div>
      ) : (
        grouped.map((group) => (
          <div key={group.key} className="space-y-2">
            <h2 className="text-xl font-semibold">{group.label}</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Image</th>
                  <th className="p-2 w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item: any) => (
                  <tr key={item.$id} className="border-t">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      {Number.isFinite(Number(item.price))
                        ? `$${Number(item.price).toFixed(2)}`
                        : "—"}
                    </td>
                    <td className="p-2">{item.src ? "✅" : "—"}</td>
                    <td className="p-2 flex gap-2">
                      <a
                        className="text-primary underline"
                        href={`/admin/menu/${item.$id}`}
                      >
                        Edit
                      </a>
                      <button
                        className="text-destructive underline"
                        onClick={() => handleDelete(item.$id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Numeric pager */}
      {totalPages > 1 && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-3 py-1 border rounded ${
                n === page ? "bg-primary text-white" : ""
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
