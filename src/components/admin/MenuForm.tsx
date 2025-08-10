"use client";
import { useState } from "react";

type FormValues = {
  name: string;
  description?: string;
  price: string; // store as string for easier editing
  category: string;
  note?: string;
  isVegan?: boolean;
  isCooked?: boolean;
  order?: string;
  src?: string;
  imageId?: string;
};

const CATEGORIES = [
  "appetizers",
  "salads",
  "traditionalRolls",
  "delightfulRolls",
  "nigiri",
  "ramen",
  "sushiRiceBowl",
  "sashimi",
];

type MenuFormInitial = Partial<FormValues> & { $id?: string };

export default function MenuForm({
  initial,
  onSaved,
}: {
  initial?: MenuFormInitial;
  onSaved?: (doc: any) => void;
}) {
  const [values, setValues] = useState<FormValues>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price?.toString() ?? "",
    category: initial?.category ?? "appetizers",
    note: initial?.note ?? "",
    isVegan: initial?.isVegan ?? false,
    isCooked: initial?.isCooked ?? false,
    order: initial?.order?.toString() ?? "",
    src: initial?.src ?? "",
    imageId: initial?.imageId ?? "",
  });
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof FormValues>(k: K, v: FormValues[K]) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // instant local preview
    const localPreview = URL.createObjectURL(file);
    set("src", localPreview);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: fd,
      });

      // Try JSON; if not JSON, read text so we can show a useful error
      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text().catch(() => "Unknown error") };

      if (!res.ok) {
        console.error("Upload failed:", payload);
        alert(payload.error || "Upload failed");
        set("src", initial?.src ?? ""); // <— revert
        return;
      }

      // API might return imageId or fileId; support both
      const imageId = payload.imageId || payload.fileId;
      const url = payload.url;

      if (!imageId || !url) {
        console.error("Upload missing fields:", payload);
        alert("Upload failed: bad response");
        return;
      }

      set("imageId", imageId);
      set("src", url); // swap preview to real URL
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...values,
      price: values.price ? Number(values.price) : 0,
      order: values.order ? Number(values.order) : 0,
    };

    const method = initial?.["$id"] ? "PATCH" : "POST";

    const url = initial?.["$id"] ? `/api/menu/${initial["$id"]}` : "/api/menu";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Save failed");
    onSaved?.(data);

    // Clear form after successful submit (only if creating new)
    if (!initial?.["$id"]) {
      setValues({
        name: "",
        description: "",
        price: "",
        category: "appetizers",
        note: "",
        isVegan: false,
        isCooked: false,
        order: "",
        src: "",
        imageId: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
      {/* Name */}
      <label className="font-medium">
        Name
        <input
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="Enter dish name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </label>

      {/* Description */}
      <label className="font-medium">
        Description
        <textarea
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="Short description of the dish"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </label>

      {/* Price */}
      <label className="font-medium">
        Price
        <input
          type="number"
          step="0.01"
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="Enter price"
          value={values.price}
          onChange={(e) => set("price", e.target.value)}
          required
        />
      </label>

      {/* Category */}
      <label className="font-medium">
        Category
        <select
          className="border rounded px-3 py-2 mt-1 w-full"
          value={values.category}
          onChange={(e) => set("category", e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Note */}
      <label className="font-medium">
        Note
        <input
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="e.g. Chef’s recommendation"
          value={values.note}
          onChange={(e) => set("note", e.target.value)}
        />
      </label>

      {/* Checkboxes */}
      <div className="flex gap-6 mt-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.isVegan}
            onChange={(e) => set("isVegan", e.target.checked)}
          />
          Vegan
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.isCooked}
            onChange={(e) => set("isCooked", e.target.checked)}
          />
          Cooked
        </label>
      </div>

      {/* Order */}
      <label className="font-medium">
        Order
        <input
          type="number"
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="Sorting order (optional)"
          value={values.order}
          onChange={(e) => set("order", e.target.value)}
        />
      </label>

      {/* Image */}
      <div className="grid gap-2">
        <label className="font-medium">Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleUpload} />
        {uploading ? (
          <p className="text-sm text-muted-foreground">
            Uploading… please wait
          </p>
        ) : null}

        {values.src && (
          <img
            src={values.src}
            alt=""
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* Submit */}
      <button
        className="bg-primary text-white px-4 py-2 rounded w-fit disabled:opacity-60"
        disabled={uploading}
      >
        {initial?.["$id"] ? "Update" : "Create"}
      </button>
    </form>
  );
}
