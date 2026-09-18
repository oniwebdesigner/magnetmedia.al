import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Fushat e detyrueshme mungojnë." },
        { status: 400 }
      );
    }

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f1ec; padding: 32px 16px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e0d8;">
          
          <div style="background-color: #2b2118; padding: 24px 32px;">
            <h1 style="color: #d4af6a; font-size: 18px; margin: 0; font-weight: 600;">
              Kërkesë e re nga faqja — Magnet Media
            </h1>
          </div>

          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #2b2118;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 110px;">Emri</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #b8863f; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Telefon</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Shërbimi</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${service || "-"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="font-weight: 600; font-size: 14px; color: #2b2118; margin: 0 0 8px;">Mesazhi</p>
              <p style="font-size: 14px; line-height: 1.6; color: #4a4038; background-color: #f9f7f3; padding: 16px; border-radius: 10px; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="background-color: #f9f7f3; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; color: #a39a8d; margin: 0;">
              Dërguar automatikisht nga formulari i kontaktit • magnetmedia.al
            </p>
          </div>

        </div>
      </div>
    `;

    await resend.emails.send({
      from: "MagnetMedia Kontakt <onboarding@resend.dev>",
      to: "magnetmedia.al@gmail.com",
      replyTo: email,
      subject: `Kërkesë nga faqja — ${name}`,
      html: htmlBody,
      text: `Emri: ${name}\nEmail: ${email}\nTelefon: ${phone || "-"}\nShërbimi: ${service || "-"}\n\nMesazhi:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Dërgimi dështoi. Provo përsëri." },
      { status: 500 }
    );
  }
}