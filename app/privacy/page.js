export const metadata = {
  title: 'Privacy Policy | Fashionistas.ai',
  description: 'Privacy policy for Fashionistas.ai — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: 760, padding: '80px 32px 120px' }}>
      <h1 style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
      }}>Privacy Policy</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        marginBottom: 64,
      }}>Last updated: April 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Section title="Introduction">
          <p>Fashionistas.ai ("we," "us," or "our") operates the website fashionistas.ai. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this policy carefully. By using our site, you consent to the practices described herein.</p>
        </Section>

        <Section title="Information We Collect">
          <p>We collect information that you voluntarily provide when you interact with our site, including:</p>
          <ul style={listStyle}>
            <li><strong style={{ color: 'var(--text)' }}>Personal Information:</strong> Name, email address, phone number, billing address, and shipping address.</li>
            <li><strong style={{ color: 'var(--text)' }}>Payment Information:</strong> Credit card numbers, debit card numbers, and other payment details. Payment processing is handled securely by third-party processors; we do not store full payment card data on our servers.</li>
            <li><strong style={{ color: 'var(--text)' }}>Account Information:</strong> If you create an account, we store your login credentials and order history.</li>
            <li><strong style={{ color: 'var(--text)' }}>Communications:</strong> Any messages, emails, or inquiries you send to us.</li>
          </ul>
          <p style={{ marginTop: 16 }}>We also automatically collect certain information when you visit our site, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul style={listStyle}>
            <li>Process and fulfill your orders, including shipping and delivery.</li>
            <li>Communicate with you about your orders, inquiries, and customer support requests.</li>
            <li>Send promotional emails and marketing communications (you may opt out at any time).</li>
            <li>Improve our website, products, and customer experience.</li>
            <li>Prevent fraudulent transactions and monitor against theft.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="Third-Party Services">
          <p>We share your information with trusted third parties only as necessary to operate our business:</p>
          <ul style={listStyle}>
            <li><strong style={{ color: 'var(--text)' }}>Shopify:</strong> Our e-commerce platform, which processes and stores order data.</li>
            <li><strong style={{ color: 'var(--text)' }}>Payment Processors:</strong> Including Shopify Payments, PayPal, and other payment gateways that securely process your transactions.</li>
            <li><strong style={{ color: 'var(--text)' }}>Shipping Carriers:</strong> USPS, UPS, FedEx, and other carriers who deliver your orders.</li>
            <li><strong style={{ color: 'var(--text)' }}>Analytics Providers:</strong> Such as Google Analytics, to help us understand site usage and improve our services.</li>
            <li><strong style={{ color: 'var(--text)' }}>Advertising Partners:</strong> Including Google Ads, to deliver relevant advertisements.</li>
          </ul>
          <p style={{ marginTop: 16 }}>We do not sell, rent, or trade your personal information to unrelated third parties for their marketing purposes.</p>
        </Section>

        <Section title="Cookies">
          <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device. We use:</p>
          <ul style={listStyle}>
            <li><strong style={{ color: 'var(--text)' }}>Essential Cookies:</strong> Required for site functionality, such as shopping cart and checkout.</li>
            <li><strong style={{ color: 'var(--text)' }}>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
            <li><strong style={{ color: 'var(--text)' }}>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign performance.</li>
          </ul>
          <p style={{ marginTop: 16 }}>You can manage your cookie preferences through your browser settings. Disabling cookies may affect site functionality.</p>
        </Section>

        <Section title="Data Security">
          <p>We implement commercially reasonable security measures to protect your personal information, including SSL encryption for data transmission and secure storage practices. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="Data Retention">
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order records are retained for accounting and legal compliance purposes.</p>
        </Section>

        <Section title="Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul style={listStyle}>
            <li>Access, correct, or delete your personal information.</li>
            <li>Object to or restrict the processing of your data.</li>
            <li>Request a copy of your data in a portable format.</li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>
          <p style={{ marginTop: 16 }}>To exercise any of these rights, please contact us at the email address below.</p>
        </Section>

        <Section title="Children's Privacy">
          <p>Our site is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.</p>
        </Section>

        <Section title="Contact Us">
          <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
          <div style={{ marginTop: 16, color: 'var(--text-secondary)', lineHeight: 2 }}>
            <p>Email: <a href="mailto:info@shopkurt.com" style={{ color: 'var(--accent)' }}>info@shopkurt.com</a></p>
            <p>Fashionistas.ai</p>
            <p>101 West Camino Real #605</p>
            <p>Boca Raton, FL 33432</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 style={{
        fontSize: '0.7rem',
        fontWeight: 400,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: 20,
      }}>{title}</h2>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        lineHeight: 1.9,
        fontWeight: 300,
      }}>
        {children}
      </div>
    </section>
  );
}

const listStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 12,
};
