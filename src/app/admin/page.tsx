"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// items shown per page (client-side)
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

const CATEGORY_KEYS = ["", ...Object.keys(CATEGORY_LABELS)]; // "" = All

export default function AdminHome() {
  const [selectedCat, setSelectedCat] = useState<string>(""); // "" = All
  const [page, setPage] = useState(1);

  // Build URL: always ask for all results (no 25-item cap); optionally filter by category
  const qs = new URLSearchParams();
  if (selectedCat) qs.set("category", selectedCat);
  qs.set("all", "true");

  const { data, mutate, isLoading } = useSWR(
    `/api/menu?${qs.toString()}`,
    fetcher
  );

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
    else alert("Delete failed");
  }

  // Normalize results
  const allDocs: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.documents)
    ? data.documents
    : [];

  // Client-side pagination over the full set we fetched
  const total = allDocs.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const offset = (page - 1) * PAGE_SIZE;
  const pageDocs = allDocs.slice(offset, offset + PAGE_SIZE);

  // Group only the docs for the current page (so each page stays small)
  const grouped = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const item of pageDocs) {
      const cat = item.category || "uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    const orderedKeys = selectedCat
      ? [selectedCat] // single group when filtering
      : [
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
  }, [pageDocs, selectedCat]);

  // Reset to page 1 if category changes
  function onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCat(e.target.value);
    setPage(1);
  }

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="space-y-6">
      {/* Header + controls */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-bold">Menu Items</h1>

        <div className="flex items-center gap-3">
          <label className="text-sm">
            Category:{" "}
            <select
              className="border rounded px-2 py-1"
              value={selectedCat}
              onChange={onChangeCategory}
            >
              <option value="">All</option>
              {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>

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
