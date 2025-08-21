import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, contact, date, time, guests } = body;

  try {
    await resend.emails.send({
      from: "Blue Bird Haus <noreply@bluebirdhaus.online>",
      to: [contact, "simonlinn2@gmail.com"], // ✅ Your client email
      subject: "Reservation Cancellation",
      html: `
        <p>Hello ${name},</p>
        <p>Your reservation for ${guests} guest(s) on ${date} at ${time} has been cancelled.</p>
        <p>If this was a mistake, please contact us to reschedule.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel email failed", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
