import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Koda Gaming Parental Controls Privacy Policy | Koda",
  description:
    "How Koda Gaming Parental Controls collects, uses, protects, and deletes family data for parental controls, PC gaming safety, and parent alerts.",
};

const HTML = `<h1>Privacy Policy</h1>
<p>Last Updated: May 23, 2026</p>
<p>
This Privacy Policy explains how Koda collects, uses, shares, stores, and protects information when You use the Koda website, Koda Gaming Parental Controls application, parent dashboard, waitlist, and related services (collectively, the "Service").
</p>

<h2>1. Definitions</h2>
<ul>
  <li><strong>Account</strong> means the parent or family account used to access the Service.</li>
  <li><strong>Application</strong> means the Koda or Koda Gaming Parental Controls software and related tools.</li>
  <li><strong>Company, We, Us, or Our</strong> means Koda, with mailing address 160 W. Camino Real #594, Boca Raton, FL 33432, United States.</li>
  <li><strong>Child Profile</strong> means a profile a parent or guardian creates to manage monitoring, alerts, and family safety settings.</li>
  <li><strong>Monitoring Data</strong> means activity, content, metadata, transcripts, screenshots, clips, alerts, platform information, device information, and other safety signals collected or processed to provide parental-control and online-safety features.</li>
  <li><strong>Personal Data</strong> means information that identifies or can reasonably be linked to an individual.</li>
  <li><strong>Service</strong> means the website, application, parent dashboard, APIs, alerts, emails, and related services.</li>
  <li><strong>You</strong> means the person using the Service or the parent, guardian, or organization using the Service on behalf of a family.</li>
</ul>

<h2>2. Information We Collect</h2>
<h3>2.1 Parent Account Information</h3>
<p>We may collect information You provide when You join the waitlist, create an account, contact support, or subscribe to the Service.</p>
<ul>
  <li>Name</li>
  <li>Email address</li>
  <li>Billing and subscription status</li>
  <li>Support requests and communications</li>
  <li>Optional family setup details You choose to provide</li>
</ul>

<h3>2.2 Child Profile and Monitoring Data</h3>
<p>To provide Koda Gaming Parental Controls features, We may process information related to a child profile or monitored device.</p>
<ul>
  <li>Child profile name or nickname</li>
  <li>Age range, device, and platform settings You provide</li>
  <li>Games, apps, websites, and platforms used on monitored devices</li>
  <li>Text, voice-derived text, chat context, screenshots, clips, timestamps, and alert details related to monitored activity</li>
  <li>Safety classifications such as bullying, grooming, threats, self-harm, sexual content, or harmful language</li>
</ul>

<h3>2.3 Device and Usage Data</h3>
<p>We may automatically collect device and usage information to operate, secure, debug, and improve the Service.</p>
<ul>
  <li>Device type, operating system, browser, app version, and identifiers</li>
  <li>IP address and approximate location derived from network information</li>
  <li>Feature usage, page views, diagnostics, crash reports, and performance data</li>
  <li>Cookies, analytics tags, and similar technologies on the website</li>
</ul>

<h2>3. How We Use Information</h2>
<p>We use information to:</p>
<ul>
  <li>Provide parent alerts, dashboards, setup flows, and Koda Gaming Parental Controls monitoring features</li>
  <li>Detect, classify, and surface online safety risks</li>
  <li>Operate, secure, troubleshoot, and improve the Service</li>
  <li>Process subscriptions, payments, and account requests</li>
  <li>Respond to support, privacy, and deletion requests</li>
  <li>Send service updates, product information, and optional marketing communications</li>
  <li>Comply with legal obligations and enforce Our rights</li>
</ul>

<h2>4. How We Share Information</h2>
<p>We do not sell Personal Data. We may share information with:</p>
<ul>
  <li>Service providers that help Us host, secure, analyze, email, support, or bill for the Service</li>
  <li>Payment processors and app-store or subscription platforms where applicable</li>
  <li>Law enforcement, regulators, or courts when required by law or necessary to protect safety</li>
  <li>Professional advisors, auditors, or business transaction partners under appropriate confidentiality obligations</li>
  <li>Other parties when You direct Us to share information or give consent</li>
</ul>

<h2>5. Family Monitoring and Responsible Use</h2>
<p>
Koda is designed for parents and legal guardians to support child safety. You are responsible for using the Service only where You have the legal right to do so, for explaining monitoring to children in an age-appropriate way, and for complying with applicable laws.
</p>

<h2>6. Retention and Deletion</h2>
<p>
We retain Personal Data and Monitoring Data for as long as needed to provide the Service, maintain accounts, comply with law, resolve disputes, enforce agreements, and improve safety features. You may request deletion by contacting support@kodasafety.com. Some information may remain in backups or records where required by law or legitimate business needs.
</p>

<h2>7. Security</h2>
<p>
We use administrative, technical, and organizational safeguards designed to protect information. No online service can be guaranteed to be completely secure, but We work to limit access, protect family data, and reduce risk.
</p>

<h2>8. Children's Privacy</h2>
<p>
The Service is intended for use by parents and legal guardians. Parents and guardians are responsible for creating child profiles, authorizing monitoring, and ensuring that use of the Service complies with applicable child privacy and consent laws.
</p>

<h2>9. Your Privacy Rights</h2>
<p>Depending on Your jurisdiction, You may have rights to access, correct, delete, export, restrict, or object to certain processing of Personal Data. You may exercise these rights by contacting support@kodasafety.com.</p>

<h2 id="ca_privacy_rights">10. California Privacy Rights</h2>
<p>
California residents may have the right to know what categories of Personal Data We collect, request deletion or correction, opt out of sale or sharing where applicable, and limit use of sensitive personal information where applicable. Koda does not sell Personal Data.
</p>

<h2>11. International Transfers</h2>
<p>
Information may be processed in the United States or other countries where We or Our service providers operate. We use safeguards required by applicable law for cross-border transfers.
</p>

<h2>12. Changes to This Policy</h2>
<p>
We may update this Privacy Policy from time to time. Updates are effective when posted unless otherwise stated. Material changes may also be communicated by email or in-product notice.
</p>

<h2>13. Contact Us</h2>
<p>If You have questions or requests, contact Us at <a href="mailto:support@kodasafety.com">support@kodasafety.com</a>.</p>`;

export default function Page() {
  return (
    <LegalLayout>
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </LegalLayout>
  );
}
