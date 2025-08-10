// src/components/admin/BulkImageUpload.tsx
"use client";
import { useState } from "react";

export default function BulkImageUpload() {
  const [busy, setBusy] = useState(false);
  const [mapText, setMapText] = useState("");

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    setBusy(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      const res = await fetch("/api/upload-images", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Upload failed");
      // give user a mapping they can paste into their spreadsheet
      const lines = data.items
        .map((i: any) => `${i.fileName},${i.url},${i.imageId}`)
        .join("\n");
      setMapText(`fileName,src,imageId\n${lines}`);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="grid gap-2">
      <label className="font-medium">Bulk Upload Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        disabled={busy}
      />
      {mapText && (
        <textarea
          className="border rounded p-2 w-full h-40"
          readOnly
          value={mapText}
        />
      )}
      <p className="text-sm text-muted-foreground">
        Copy this mapping into your CSV (match rows by fileName), or merge by
        hand.
      </p>
    </div>
  );
}
