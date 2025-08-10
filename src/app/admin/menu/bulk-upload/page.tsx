"use client";
import { useState } from "react";

export default function BulkUploadMenuImages() {
  const [results, setResults] = useState<any[]>([]);

  async function handleBulkUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const fd = new FormData();
    files.forEach((f) => fd.append("files", f)); // must match API route

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setResults(data.items || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Bulk Upload Menu Images</h1>
      <input
        type="file"
        multiple
        onChange={handleBulkUpload}
        className="mb-4"
      />
      {results.length > 0 && (
        <div>
          <h2 className="font-semibold">Uploaded:</h2>
          <ul className="list-disc ml-6">
            {results.map((r) => (
              <li key={r.imageId}>
                {r.fileName} —{" "}
                <a href={r.url} target="_blank">
                  {r.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
