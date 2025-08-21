"use client";

import { use, useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

// Accepts "YYYY-MM-DD" or full ISO like "2025-08-20T00:00:00.000Z"
function formatDateLocal(dateInput: string) {
  if (!dateInput) return "";

  // Always take the first 10 chars "YYYY-MM-DD" to avoid "Invalid Date"
  const base = dateInput.slice(0, 10); // safe even if ISO
  const [y, m, d] = base.split("-").map(Number);

  const date = new Date(y, (m || 1) - 1, d || 1); // local midnight
  if (isNaN(date.getTime())) return ""; // still bad? bail safely

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Accepts "HH:mm", "HH:mm:ss", or anything starting with HH:mm
function formatTimeHHMM(timeInput: string) {
  if (!timeInput) return "";
  const base = timeInput.slice(0, 5); // "HH:mm"
  const [hStr, m = "00"] = base.split(":");
  let h = Number(hStr);
  if (isNaN(h)) return "";

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export default function CancelPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params); // ✅ unwrap params

  const [reservation, setReservation] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          token
        );

        if (res.cancelExpires && new Date(res.cancelExpires) < new Date()) {
          setMessage("❌ This cancellation link has expired.");
        } else {
          setReservation(res);
        }
      } catch {
        setMessage("❌ Invalid or already cancelled reservation.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Processing...");

    if (!reservation) {
      setMessage("❌ Reservation not found.");
      return;
    }

    if (email.trim() !== reservation.contact) {
      setMessage("❌ Email does not match the reservation.");
      return;
    }

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, token);
      setMessage("✅ Reservation successfully canceled.");
      setReservation(null);
    } catch {
      setMessage("❌ Something went wrong while canceling.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (message && !reservation) return <p className="text-center">{message}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Cancel Reservation</h2>
      <p className="mb-4">
        Reservation for <strong>{reservation.name}</strong> on{" "}
        <strong>{formatDateLocal(reservation.date)}</strong> at{" "}
        <strong>{formatTimeHHMM(reservation.time)}</strong>.
      </p>

      <form onSubmit={handleCancel}>
        <label className="block mb-2 font-medium">
          Enter your email to confirm:
        </label>
        <input
          type="email"
          required
          className="border px-4 py-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Cancel Reservation
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
