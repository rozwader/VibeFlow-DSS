import { sendWelcomeEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, username } = await request.json();
    await sendWelcomeEmail(email, username);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}