export const metadata = {
  title: 'Terms of Service | Fashionistas.ai',
  description: 'Terms of service for Fashionistas.ai — the rules and guidelines governing your use of our website and services.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: 760, padding: '80px 32px 120px' }}>
      <h1 style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
      }}>Terms of Service</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        marginBottom: 64,
      }}>Last updated: April 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Section title="Acceptance of Terms">
          <p>By accessing or using the Fashionistas.ai website ("Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you must not use the Site. We reserve the right to modify these Terms at any time, and your continued use of the Site constitutes acceptance of any changes.</p>
        </Section>

        <Section title="Use of the Site">
          <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You must not:</p>
          <ul style={listStyle}>
            <li>Use the Site in any way that violates applicable laws or regulations.</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its systems.</li>
            <li>Transmit any viruses, malware, or other harmful code.</li>
            <li>Use the Site to collect personal information of other users without consent.</li>
            <li>Interfere with or disrupt the operation of the Site.</li>
          </ul>
        </Section>

        <Section title="Products and Pricing">
          <p>We strive to display product descriptions, images, and pricing as accurately as possible. However, we do not warrant that product descriptions, colors, or other content on the Site are error-free, complete, or current.</p>
          <p style={{ marginTop: 12 }}>All prices are listed in US dollars and are subject to change without notice. We reserve the right to modify or discontinue any product at any time. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.</p>
        </Section>

        <Section title="Orders and Payment">
          <p>By placing an order, you represent that all information you provide is accurate and complete. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.</p>
          <p style={{ marginTop: 12 }}>Payment is required at the time of purchase. We accept major credit cards, debit cards, and other payment methods as displayed at checkout. All payments are processed securely through our third-party payment processors.</p>
        </Section>

        <Section title="Shipping and Delivery">
          <p>Please refer to our <a href="/shipping-policy" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Shipping Policy</a> for detailed information about shipping methods, delivery times, and costs. We are not responsible for delays caused by shipping carriers, customs, or events beyond our control.</p>
        </Section>

        <Section title="Returns and Refunds">
          <p>Our return and refund procedures are outlined in our <a href="/refund-policy" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Return & Refund Policy</a>. By making a purchase, you agree to the terms outlined in that policy.</p>
        </Section>

        <Section title="Intellectual Property">
          <p>All content on this Site, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of Fashionistas.ai or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
          <p style={{ marginTop: 12 }}>You may not reproduce, distribute, modify, create derivative works from, display, or otherwise use any content from this Site without our express written permission.</p>
        </Section>

        <Section title="User Accounts">
          <p>If you create an account on our Site, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts at our discretion.</p>
        </Section>

        <Section title="Disclaimer of Warranties">
          <p>The Site and all products and services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Site will be uninterrupted, secure, or error-free.</p>
        </Section>

        <Section title="Limitation of Liability">
          <p>To the fullest extent permitted by law, Fashionistas.ai and its owners, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the Site or purchase of products, regardless of the theory of liability.</p>
          <p style={{ marginTop: 12 }}>Our total liability for any claim arising from your use of the Site or our products shall not exceed the amount you paid for the product giving rise to the claim.</p>
        </Section>

        <Section title="Indemnification">
          <p>You agree to indemnify, defend, and hold harmless Fashionistas.ai and its owners, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in connection with your use of the Site, your violation of these Terms, or your violation of any third-party rights.</p>
        </Section>

        <Section title="Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Palm Beach County, Florida.</p>
        </Section>

        <Section title="Severability">
          <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.</p>
        </Section>

        <Section title="Contact Us">
          <p>If you have questions about these Terms of Service, please contact us:</p>
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
