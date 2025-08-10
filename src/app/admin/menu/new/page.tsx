"use client";
import MenuForm from "@/components/admin/MenuForm";

export default function NewMenuPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Menu Item</h1>
      {/* <MenuForm
        onSaved={(doc) => (window.location.href = `/admin/menu/${doc.$id}`)}
      /> */}
      <MenuForm
        onSaved={() => {
          /* maybe show a toast, but do NOT navigate */
        }}
      />
    </div>
  );
}
