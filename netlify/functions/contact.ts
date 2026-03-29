// Netlify Function: POST /api/contact
// Receives a contact form submission and sends an email via Resend.
// Environment variables required (set in Netlify dashboard):
//   RESEND_API_KEY          — your Resend API key
//   CONTACT_EMAIL_TO        — the inbox to receive contact messages (e.g. info@businessbankcompare.co.uk)

import type { Handler, HandlerEvent } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML escaping to prevent injection in email body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let name: string, email: string, subject: string, message: string, enquiryType: string;
  try {
    const body = JSON.parse(event.body || '{}');
    name = (body.name || '').trim();
    email = (body.email || '').trim().toLowerCase();
    subject = (body.subject || '').trim();
    message = (body.message || '').trim();
    enquiryType = (body.enquiryType || 'general').trim();
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || name.length < 2) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter your name.' }) };
  }
  if (!email || !emailRegex.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter a valid email address.' }) };
  }
  if (!subject || subject.length < 3) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter a subject.' }) };
  }
  if (!message || message.length < 10) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please enter a message (at least 10 characters).' }) };
  }

  // Map enquiry type to the right inbox
  const enquiryToMap: Record<string, string> = {
    general: 'info@businessbankcompare.co.uk',
    editorial: 'editorial@businessbankcompare.co.uk',
    partnership: 'partnerships@businessbankcompare.co.uk',
    privacy: 'privacy@businessbankcompare.co.uk',
  };
  const toAddress = process.env.CONTACT_EMAIL_TO || enquiryToMap[enquiryType] || 'info@businessbankcompare.co.uk';

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const safeEnquiryType = escapeHtml(enquiryType);

  try {
    // 1. Send notification to the site owner
    await resend.emails.send({
      from: 'Business Bank Compare Contact Form <hello@businessbankcompare.co.uk>',
      to: toAddress,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                  <tr>
                    <td style="background:#0a1e3c;padding:24px 40px;">
                      <h1 style="color:#ffffff;font-size:18px;font-weight:700;margin:0;">New Contact Form Submission</h1>
                      <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:4px 0 0;">Business Bank Compare</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">From</span><br/>
                            <span style="color:#0f172a;font-size:15px;">${safeName} &lt;${safeEmail}&gt;</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Enquiry Type</span><br/>
                            <span style="color:#0f172a;font-size:15px;text-transform:capitalize;">${safeEnquiryType}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Subject</span><br/>
                            <span style="color:#0f172a;font-size:15px;">${safeSubject}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px 0 0;">
                            <span style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Message</span><br/>
                            <div style="color:#334155;font-size:15px;line-height:1.6;margin-top:8px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
                              ${safeMessage}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f1f5f9;padding:16px 40px;border-top:1px solid #e2e8f0;">
                      <p style="color:#94a3b8;font-size:12px;margin:0;">
                        Reply directly to this email to respond to ${safeName}. Sent ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}.
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

    // 2. Send auto-reply confirmation to the sender
    await resend.emails.send({
      from: 'Business Bank Compare <hello@businessbankcompare.co.uk>',
      to: email,
      subject: `We've received your message — Business Bank Compare`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                  <tr>
                    <td style="background:#0a1e3c;padding:32px 40px;text-align:center;">
                      <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">Business Bank Compare</h1>
                      <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:8px 0 0;">Independent UK Business Banking Comparison</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#0f172a;font-size:20px;font-weight:700;margin:0 0 16px;">Thanks for getting in touch, ${safeName}!</h2>
                      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
                        We've received your message and will get back to you as soon as possible. Our typical response time is:
                      </p>
                      <ul style="color:#475569;font-size:15px;line-height:1.8;padding-left:20px;margin:0 0 24px;">
                        <li><strong>General enquiries:</strong> 2–3 working days</li>
                        <li><strong>Editorial &amp; corrections:</strong> 5 working days</li>
                        <li><strong>Partnership enquiries:</strong> 3–5 working days</li>
                      </ul>
                      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:24px;">
                        <p style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px;">Your message</p>
                        <p style="color:#334155;font-size:14px;line-height:1.6;margin:0;"><em>"${safeSubject}"</em></p>
                      </div>
                      <a href="https://businessbankcompare.co.uk/compare" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;margin-bottom:24px;">
                        Browse Accounts While You Wait →
                      </a>
                      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0;">
                        <strong>Important:</strong> Business Bank Compare is an independent comparison website. We cannot access your bank account or resolve issues with your bank. For account-specific issues, please contact your bank directly.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f1f5f9;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="color:#94a3b8;font-size:12px;margin:0;">
                        © ${new Date().getFullYear()} Business Bank Compare · Independent &amp; Unbiased<br/>
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
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' }),
    };
  } catch (err: unknown) {
    console.error('Contact form error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
    };
  }
};
