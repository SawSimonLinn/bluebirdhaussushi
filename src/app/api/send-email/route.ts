import { Resend } from "resend";
import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_SITE_URL
    ? "http://localhost:9002"
    : process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, contact, date, time, guests, bookingId, cancelToken } = body;

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

  // Convert to readable date and time
  const reservationDate = new Date(`${date}T${time}`);
  const formattedDate = reservationDate.toLocaleDateString("en-US", {
    weekday: "long", // Monday, Tuesday...
    year: "numeric",
    month: "long", // August
    day: "numeric",
  });

  const formattedTime = reservationDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // AM/PM format
  });

  // Your static restaurant info
  const address = "1532 E Broadway Long Beach, CA 90802";
  const phone = "+1-562-533-2460";
  const hours =
    "Mon, Wed, Thu, Sun: 2:30 PM - 9:30 PM\n" +
    "Fri, Sat: 2:30 PM - 11:00 PM\n" +
    "Tue: Closed";

  const facebook = "https://www.facebook.com/profile.php?id=100083751994296";
  const instagram = "https://www.instagram.com/blue.bird.haus/";
  const yelp = "https://www.yelp.com/biz/blue-bird-haus-long-beach";
  const cancelLink = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const cancelUrl = `${baseUrl}/cancel/${cancelToken}`;

  try {
    const response = await resend.emails.send({
      from: "Blue Bird Haus <noreply@bluebirdhaus.online>",
      to: [contact, "simonlinn2@gmail.com"], // ✅ add your or your client's real email
      subject: "Reservation Confirmation",
      html: `
    <p>Hello ${name},</p>
    <p>Your reservation for <strong>${guests} guest(s)</strong> is confirmed on <strong>${formattedDate}</strong> at <strong>${formattedTime}</strong>.</p>
    <p>Your booking reference number is <strong>${bookingId}</strong>.</p>
    <hr />

    <h3>Restaurant Info</h3>
    <p>📍 <strong>Location:</strong>${address}</p>
    <p>📞 <strong>Phone:</strong><a href="${cancelLink}">${phone}</a></p>
    <p style="white-space: pre-line;">⏰ <strong>Hours:</strong> ${hours}</p>
    <p>If you need to cancel, please <a href="${cancelUrl}">click here to cancel your booking</a>.</p>

<hr />
    <p>🔗 <strong>Follow us on:</strong>
    <a href="${facebook}">Facebook</a> | 
    <a href="${instagram}">Instagram</a> | 
    <a href="${yelp}">Yelp</a>
    </p>
    <p>Thank you for booking with Blue Bird Haus!</p>
    <p>Best regards,<br/>Blue Bird Haus Team</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
