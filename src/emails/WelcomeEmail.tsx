const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodasafety.com";

export function renderWelcomeEmail(args: {
  waitlistPosition: number;
}): { subject: string; html: string } {
  const subject = `You're #${args.waitlistPosition} on the Koda waitlist`;
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F1F2F4;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','Segoe UI',Roboto,Arial,sans-serif;color:#1E1E1E;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:20px;padding:40px 32px;max-width:560px;">
            <tr>
              <td>
                <h1 style="margin:0 0 16px 0;font-size:28px;line-height:1.2;font-weight:800;color:#1E1E1E;">You're on the waitlist.</h1>
                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.55;color:#3F3F46;">
                  Thanks for signing up for Koda. We monitor voice and chat across 3,000+ PC games and alert you the second something dangerous appears.
                </p>
                <div style="background:#EFF4FF;border:1px solid #DBEAFE;border-radius:14px;padding:20px;text-align:center;margin:0 0 28px 0;">
                  <div style="font-size:13px;color:#2563EB;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:6px;">Your waitlist position</div>
                  <div style="font-size:42px;font-weight:800;color:#1E1E1E;line-height:1;">#${args.waitlistPosition}</div>
                </div>
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.55;color:#3F3F46;">
                  Want to jump the line? Pay $1 and we'll move you to the front of the premium queue (around #8).
                </p>
                <p style="margin:0 0 28px 0;">
                  <a href="${SITE_URL}/get-started?step=5" style="display:inline-block;background:#2563EB;color:#FFFFFF;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:9999px;font-size:15px;">Skip the line — $1</a>
                </p>
                <p style="margin:0;font-size:13px;line-height:1.55;color:#71717A;">
                  We'll email you the moment your invite is ready. Reply to this email if you have questions.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:24px 0 0 0;font-size:12px;color:#9CA3AF;">Koda · ${SITE_URL.replace(/^https?:\/\//, "")}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  return { subject, html };
}
