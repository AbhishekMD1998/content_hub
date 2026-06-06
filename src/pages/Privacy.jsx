import LegalPage from '../components/LegalPage';
import { useMeta } from '../hooks/useMeta';

const SITE_URL = 'https://content-hub-pi-bay.vercel.app';

export default function Privacy() {
  useMeta({ title: 'Privacy Policy', description: 'Privacy policy for Content Hub — how we collect and use your data.', url: '/privacy' });
  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>Last updated:</strong> June 2026
      </p>
      <p>
        Content Hub (&quot;we&quot;, &quot;us&quot;) operates {SITE_URL}. This policy explains what
        information we collect and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Account data</strong> — If you sign up or sign in, we store your email,
          display name, and authentication details needed to run the service.
        </li>
        <li>
          <strong>Usage data</strong> — Our hosting and analytics partners may collect
          standard log data such as browser type, pages visited, and approximate location.
        </li>
        <li>
          <strong>Cookies</strong> — We use cookies and similar technologies for sign-in
          sessions and, where enabled, advertising.
        </li>
      </ul>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        We use Google AdSense to show ads. Google and its partners may use cookies to
        serve ads based on your prior visits to this site or other websites. You can
        opt out of personalized advertising by visiting{' '}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>
        .
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads. Google&apos;s use
        of advertising cookies enables it and its partners to serve ads to users based
        on their visit to your sites and/or other sites on the Internet. Users may opt
        out of personalized advertising by visiting{' '}
        <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        .
      </p>

      <h2>Affiliate and sponsored content</h2>
      <p>
        Some posts may include sponsored labels or affiliate links. If you click those
        links, the destination site may set its own cookies and collect data under its
        privacy policy.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>Provide and secure the website</li>
        <li>Publish and manage blog content</li>
        <li>Display advertising and measure performance</li>
        <li>Respond to support requests</li>
      </ul>

      <h2>Data retention</h2>
      <p>
        We keep account and content data while your account is active or as needed to
        operate the service. You may request deletion by contacting us.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions:{' '}
        <a href="mailto:content98hub@gmail.com">content98hub@gmail.com</a>
      </p>
    </LegalPage>
  );
}
