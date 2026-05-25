import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Koda Safety Terms of Service | Koda",
  description:
    "Terms for using Koda Safety, the Koda website, parental-control software, parent alerts, and related family safety services.",
};

const HTML = `<h1>Terms and Conditions</h1>
<p>Last Updated: May 23, 2026</p>
<p>Please read these Terms and Conditions carefully before accessing or using the Koda Service.</p>

<h2>1. Definitions</h2>
<ul>
  <li><strong>Application</strong> means the Koda or Koda Safety software, dashboard, tools, and updates.</li>
  <li><strong>Company, We, Us, or Our</strong> means Koda, with mailing address 160 W. Camino Real #594, Boca Raton, FL 33432, United States.</li>
  <li><strong>Parent</strong> or <strong>Guardian</strong> means a person with legal authority to use the Service for family safety and child monitoring.</li>
  <li><strong>Service</strong> means the Application, website, waitlist, parent dashboard, alerts, subscriptions, and related services offered by Koda.</li>
  <li><strong>User Content</strong> means information, settings, text, images, audio, metadata, device activity, or other content submitted, captured, or processed through the Service.</li>
  <li><strong>Website</strong> means <a href="https://kodasafety.com" target="_blank" rel="noopener noreferrer">kodasafety.com</a> and associated subdomains.</li>
  <li><strong>You</strong> means the person or entity accessing or using the Service.</li>
</ul>

<h2>2. Agreement to Terms</h2>
<p>
By accessing or using the Service, You agree to these Terms and the Koda Privacy Policy. If You do not agree, You must stop using the Service.
</p>

<h2>3. Eligibility and Authority</h2>
<p>
You must be at least 18 years old or the age of majority in Your jurisdiction to create a parent account or purchase a subscription. You represent that You have the legal authority and required consents to install, configure, or use Koda Safety on any monitored device or child profile.
</p>

<h2>4. Parent and Child Safety Use</h2>
<p>
Koda Safety is designed to help parents and guardians identify online risks such as grooming, bullying, threats, self-harm signals, sexual content, and harmful language. You are responsible for using the Service lawfully, transparently, and in a manner appropriate for Your family.
</p>
<ul>
  <li>You must not use the Service to monitor anyone where You lack legal authority.</li>
  <li>You are responsible for explaining monitoring to children where required by law or appropriate for Your family.</li>
  <li>You are responsible for responding to alerts and making family safety decisions.</li>
  <li>The Service is not an emergency service and does not replace contacting emergency responders, law enforcement, medical professionals, or child-safety authorities when needed.</li>
</ul>

<h2>5. No Guarantee of Detection</h2>
<p>
The Service uses automated tools and safety models to identify potential risks. Koda may miss risks, classify content incorrectly, generate false positives, or be limited by platform, device, network, or configuration changes. You should not rely on Koda as the only safety measure for a child.
</p>

<h2>6. Account Security</h2>
<p>
You are responsible for maintaining the confidentiality of Your account credentials and for all activity under Your account. Notify Us promptly if You believe Your account has been compromised.
</p>

<h2>7. User Content and License</h2>
<p>
You retain ownership of User Content. You grant Koda a limited, worldwide, non-exclusive license to host, process, analyze, transmit, display, and store User Content as needed to provide, secure, support, and improve the Service.
</p>

<h2>8. Prohibited Uses</h2>
<ul>
  <li>Using the Service for unlawful surveillance, stalking, harassment, or abuse</li>
  <li>Monitoring devices or accounts without legal authority or required consent</li>
  <li>Reverse engineering, scraping, attacking, or interfering with the Service</li>
  <li>Submitting unlawful, harmful, infringing, or deceptive content</li>
  <li>Bypassing security, payment, access, or monitoring controls</li>
  <li>Using the Service to build or train a competing product without written permission</li>
</ul>

<h2>9. Subscriptions and Billing</h2>
<p>
Paid plans, renewals, trials, refunds, and cancellations may be processed through third-party payment processors or app-store platforms. Their terms may also apply. Unless stated otherwise, subscriptions renew automatically until cancelled.
</p>

<h2>10. Third-Party Services</h2>
<p>
The Service may interoperate with third-party platforms, games, applications, payment processors, analytics tools, or communication providers. Koda does not control those services and is not responsible for their content, availability, rules, or privacy practices.
</p>

<h2>11. Intellectual Property</h2>
<p>
Koda owns the Service, including software, designs, logos, trademarks, text, content, models, and other intellectual property, except for User Content and third-party materials. You may not copy, modify, distribute, sell, or create derivative works from the Service except as allowed by these Terms.
</p>

<h2>12. Termination</h2>
<p>
We may suspend or terminate access to the Service if You violate these Terms, create risk, fail to pay, or use the Service unlawfully. You may stop using the Service at any time.
</p>

<h2>13. Disclaimer</h2>
<p>
The Service is provided "as is" and "as available" without warranties of any kind, express or implied. Koda disclaims warranties of merchantability, fitness for a particular purpose, accuracy, availability, and non-infringement to the maximum extent permitted by law.
</p>

<h2>14. Limitation of Liability</h2>
<p>
To the maximum extent permitted by law, Koda will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profits, data, goodwill, or safety outcomes. Koda's total liability for any claim will not exceed the greater of the amount You paid to Koda in the 12 months before the claim or USD $100.
</p>

<h2>15. Indemnity</h2>
<p>
You agree to defend, indemnify, and hold Koda harmless from claims, damages, liabilities, costs, and expenses arising from Your use of the Service, violation of these Terms, violation of law, or misuse of monitoring features.
</p>

<h2>16. Governing Law and Disputes</h2>
<p>
These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law rules. Disputes will be resolved in the state or federal courts located in Delaware unless another dispute process is required by applicable law.
</p>

<h2>17. Changes to These Terms</h2>
<p>
We may update these Terms from time to time. Updates are effective when posted unless otherwise stated. Continued use of the Service after changes means You accept the updated Terms.
</p>

<h2>18. Contact Information</h2>
<p>If You have questions about these Terms, contact Us at <a href="mailto:support@kodasafety.com">support@kodasafety.com</a>.</p>`;

export default function Page() {
  return (
    <LegalLayout>
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </LegalLayout>
  );
}
