"use client";

import useSWR from "swr";
import MenuForm from "@/components/admin/MenuForm";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function EditMenuClient({ id }: { id: string }) {
  const { data, isLoading, error, mutate } = useSWR(`/api/menu/${id}`, fetcher);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Failed to load.</p>;
  if (!data) return <p>Not found.</p>;

  return <MenuForm initial={data} onSaved={() => mutate()} />;
}
