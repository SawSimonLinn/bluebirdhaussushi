"use client";

import { use, useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long", // e.g. Wednesday
    year: "numeric",
    month: "long", // August
    day: "numeric", // 20
  });
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
        <strong>{formatDate(reservation.date)}</strong> at{" "}
        <strong>{reservation.time}</strong>.
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
