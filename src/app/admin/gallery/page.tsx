"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function GalleryPage() {
  const [uploading, setUploading] = useState(false);
  const { data, mutate, isLoading } = useSWR("/api/gallery", fetcher);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", e.target.files[0]);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) return alert("Upload failed");
    mutate();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && (
        <p className="text-sm text-muted-foreground mt-2">Uploading…</p>
      )}

      {isLoading ? (
        <p className="mt-6">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {(data?.files ?? []).map((f: any) => (
            <div key={f.$id} className="border rounded p-2">
              <img
                src={f.previewUrl}
                className="w-full aspect-square object-cover rounded"
              />
              <p className="text-xs mt-1 truncate">{f.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
