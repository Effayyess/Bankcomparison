// Netlify Function: POST /api/subscribe
// Adds an email to the Resend audience and sends a welcome email.
// Environment variables required (set in Netlify dashboard):
//   RESEND_API_KEY   — your Resend API key
//   RESEND_AUDIENCE_ID — the Resend audience/contact list ID (optional but recommended)

import type { Handler, HandlerEvent } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Parse body
  let email: string;
  try {
    const body = JSON.parse(event.body || '{}');
    email = (body.email || '').trim().toLowerCase();
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'A valid email address is required.' }),
    };
  }

  try {
    // 1. Add contact to Resend audience (if audience ID is configured)
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // 2. Send a welcome confirmation email
    await resend.emails.send({
      from: 'Business Bank Compare <hello@businessbankcompare.co.uk>',
      to: email,
      subject: 'Welcome to Business Bank Compare — You\'re subscribed!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Business Bank Compare</title>
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:#0a1e3c;padding:32px 40px;text-align:center;">
                      <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">Business Bank Compare</h1>
                      <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:8px 0 0;">Independent UK Business Banking Comparison</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#0f172a;font-size:20px;font-weight:700;margin:0 0 16px;">You're subscribed! 🎉</h2>
                      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
                        Thanks for signing up to the <strong>Business Bank Compare</strong> newsletter. You'll now receive monthly updates on:
                      </p>
                      <ul style="color:#475569;font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 24px;">
                        <li>The best new business bank account deals</li>
                        <li>Fee changes and new account launches</li>
                        <li>Exclusive welcome offers and cashback deals</li>
                        <li>Expert guides to UK business banking</li>
                      </ul>
                      <a href="https://businessbankcompare.co.uk/compare" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;margin-bottom:24px;">
                        Compare Accounts Now →
                      </a>
                      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
                        You can unsubscribe at any time by replying to this email. We never share your email address with third parties.
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f1f5f9;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="color:#94a3b8;font-size:12px;margin:0;">
                        © ${new Date().getFullYear()} Business Bank Compare · Independent &amp; Unbiased
                        <br/>
                        <a href="https://businessbankcompare.co.uk/privacy-policy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Subscribed successfully!' }),
    };
  } catch (err: unknown) {
    console.error('Newsletter subscribe error:', err);
    // Return a generic error — do not expose internal details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to subscribe. Please try again later.' }),
    };
  }
};
