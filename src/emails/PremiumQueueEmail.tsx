const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myparentalcontrols.com";

export function renderPremiumQueueEmail(args: {
  premiumPosition: number;
}): { subject: string; html: string } {
  const subject = `You're #${args.premiumPosition} in the premium queue`;
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F1F2F4;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','Segoe UI',Roboto,Arial,sans-serif;color:#1E1E1E;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:20px;padding:40px 32px;max-width:560px;">
            <tr>
              <td>
                <h1 style="margin:0 0 16px 0;font-size:28px;line-height:1.2;font-weight:800;color:#1E1E1E;">You skipped the line.</h1>
                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.55;color:#3F3F46;">
                  Thanks for backing us. You're now in the premium queue and our team will reach out shortly to get you onboarded.
                </p>
                <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:14px;padding:20px;text-align:center;margin:0 0 28px 0;">
                  <div style="font-size:13px;color:#059669;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:6px;">Premium queue position</div>
                  <div style="font-size:42px;font-weight:800;color:#1E1E1E;line-height:1;">#${args.premiumPosition}</div>
                </div>
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.55;color:#3F3F46;">
                  Watch your inbox over the next few days — you'll get setup instructions directly from our team.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.55;color:#71717A;">
                  Questions? Just reply to this email.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:24px 0 0 0;font-size:12px;color:#9CA3AF;">MyParentalControls · ${SITE_URL.replace(/^https?:\/\//, "")}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  return { subject, html };
}
