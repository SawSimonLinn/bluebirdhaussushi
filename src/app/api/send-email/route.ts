// app/api/send-email/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY!);

// optional env fallback if you want
const FALLBACK_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";

async function getOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : FALLBACK_BASE_URL;
}

export async function POST(req: Request) {
  const { name, contact, date, time, guests, bookingId, cancelToken } =
    await req.json();

  if (
    !name ||
    !contact ||
    !date ||
    !time ||
    !guests ||
    !bookingId ||
    !cancelToken
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Format date/time WITHOUT timezone surprises
  const formatDateLocal = (d: string) => {
    const base = d.slice(0, 10);
    const [y, m, day] = base.split("-").map(Number);
    const dt = new Date(y, (m ?? 1) - 1, day ?? 1);
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeHHMM = (t: string) => {
    const base = t.slice(0, 5);
    const [hStr, min = "00"] = base.split(":");
    let h = Number(hStr);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${min} ${ampm}`;
  };

  const formattedDate = formatDateLocal(date);
  const formattedTime = formatTimeHHMM(time);

  const address = "1532 E Broadway Long Beach, CA 90802";
  const phone = "+1-562-533-2460";
  const hours =
    "Mon, Wed, Thu, Sun: 2:30 PM - 9:30 PM\n" +
    "Fri, Sat: 2:30 PM - 11:00 PM\n" +
    "Tue: Closed";

  const facebook = "https://www.facebook.com/profile.php?id=100083751994296";
  const instagram = "https://www.instagram.com/blue.bird.haus/";
  const yelp = "https://www.yelp.com/biz/blue-bird-haus-long-beach";

  const origin = await getOrigin(); // ← works in dev, preview, prod
  const cancelUrl = `${origin}/cancel/${cancelToken}`;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Blue Bird Haus <noreply@bluebirdhaus.online>",
      to: [contact, "simonlinn2@gmail.com"],
      subject: "Reservation Confirmation",
      html: `
        <p>Hello ${name},</p>
        <p>Your reservation for <strong>${guests} guest(s)</strong> is confirmed on <strong>${formattedDate}</strong> at <strong>${formattedTime}</strong>.</p>
        <p>Your booking reference number is <strong>${bookingId}</strong>.</p>
        <hr />
        <h3>Restaurant Info</h3>
        <p>📍 <strong>Location:</strong> ${address}</p>
        <p>📞 <strong>Phone:</strong> <a href="${telHref}">${phone}</a></p>
        <p style="white-space: pre-line;">⏰ <strong>Hours:</strong>\n${hours}</p>
        <p>If you need to cancel, please <a href="${cancelUrl}">click here to cancel your booking</a>.</p>
        <hr />
        <p>🔗 <strong>Follow us on:</strong> <a href="${facebook}">Facebook</a> | <a href="${instagram}">Instagram</a> | <a href="${yelp}">Yelp</a></p>
        <p>Thank you for booking with Blue Bird Haus!</p>
        <p>Best regards,<br/>Blue Bird Haus Team</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: String(error) }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch (err) {
    console.error("Send email failed:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
