import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const suiteLabels: Record<string, string> = {
  treehouse: "Luxury Treehouse",
  "safari-tent": "Safari Tent",
  "forest-villa": "Forest Villa",
}

function formatDate(value?: string) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      message,
      checkIn,
      checkOut,
      guests,
      suite,
    } = body

    const suiteLabel = suiteLabels[suite] ?? suite ?? "Not specified"
    const details = `
      <h2>New Reservation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Suite:</strong> ${suiteLabel}</p>
      <p><strong>Guests:</strong> ${guests ?? "—"}</p>
      <p><strong>Check-in:</strong> ${formatDate(checkIn)}</p>
      <p><strong>Check-out:</strong> ${formatDate(checkOut)}</p>
      <p><strong>Special Requests:</strong></p>
      <p>${message || "—"}</p>
    `

    const userMail = `
      <h2>Thank you for your reservation request!</h2>
      <p>Dear ${name},</p>
      <p>We have received your request for <strong>${suiteLabel}</strong> and will
      confirm availability shortly.</p>
      <p><strong>Check-in:</strong> ${formatDate(checkIn)}<br/>
      <strong>Check-out:</strong> ${formatDate(checkOut)}<br/>
      <strong>Guests:</strong> ${guests ?? "—"}</p>
      <br/>
      <p>Warm regards,</p>
      <p>Tipeshwar Forest Retreat Team</p>
    `

    await Promise.all([
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Reservation Request - Tipeshwar Forest Retreat",
        html: details,
      }),
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your reservation request - Tipeshwar Forest Retreat",
        html: userMail,
      }),
    ])

    return NextResponse.json({ message: "Booking request sent" }, { status: 200 })
  } catch (error) {
    console.error("Error sending booking email:", error)
    return NextResponse.json({ error: "Failed to send request" }, { status: 500 })
  }
}
