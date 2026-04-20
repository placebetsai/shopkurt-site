export const metadata = {
  title: 'Return & Refund Policy | Fashionistas.ai',
  description: 'Return and refund policy for Fashionistas.ai — 30-day returns, refund processing, and exchange information.',
};

export default function RefundPolicyPage() {
  return (
    <div className="container" style={{ maxWidth: 760, padding: '80px 32px 120px' }}>
      <h1 style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
      }}>Return & Refund Policy</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        marginBottom: 64,
      }}>Last updated: April 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Section title="Overview">
          <p>We want you to love your purchase. If you are not completely satisfied, we accept returns within 30 days of delivery for most items. Please read the full policy below before initiating a return.</p>
        </Section>

        <Section title="30-Day Return Window">
          <p>You have 30 days from the date of delivery to request a return. Items must meet the following conditions to be eligible:</p>
          <ul style={listStyle}>
            <li>Items must be unused, unworn, and unwashed.</li>
            <li>Items must be in their original packaging with all tags attached.</li>
            <li>Items must be in the same condition as when you received them.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Returns requested after 30 days from delivery will not be accepted.</p>
        </Section>

        <Section title="Non-Returnable Items">
          <p>The following items cannot be returned or exchanged for hygiene and safety reasons:</p>
          <ul style={listStyle}>
            <li>Used or opened beauty products (skincare, cosmetics, fragrances).</li>
            <li>Intimate apparel, swimwear, and undergarments.</li>
            <li>Earrings and body jewelry.</li>
            <li>Gift cards.</li>
            <li>Items marked as "Final Sale" or "Non-Returnable" on the product page.</li>
          </ul>
        </Section>

        <Section title="How to Initiate a Return">
          <p>To start a return, please follow these steps:</p>
          <ol style={{ ...listStyle, listStyle: 'decimal', paddingLeft: 20 }}>
            <li>Email us at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a> with your order number and the reason for your return.</li>
            <li>Our team will respond within 24 hours with return instructions and a return authorization.</li>
            <li>Pack the item(s) securely in the original packaging.</li>
            <li>Ship the item(s) to the address provided in the return authorization.</li>
          </ol>
          <p style={{ marginTop: 12 }}>Please do not send returns without first receiving a return authorization. Unauthorized returns may be refused.</p>
        </Section>

        <Section title="Return Shipping Costs">
          <p>Return shipping costs are the responsibility of the customer, unless the item is defective, damaged, or incorrect. In those cases, we will provide a prepaid shipping label at no charge.</p>
          <p style={{ marginTop: 12 }}>We recommend using a trackable shipping method for your return. We are not responsible for items lost in return transit.</p>
        </Section>

        <Section title="Refund Processing">
          <p>Once we receive and inspect your return, we will notify you via email. If your return is approved:</p>
          <ul style={listStyle}>
            <li>Refunds will be issued to your original payment method.</li>
            <li>Please allow 5-10 business days for the refund to appear on your statement, depending on your bank or card issuer.</li>
            <li>Original shipping costs are non-refundable, unless the return is due to our error.</li>
          </ul>
          <p style={{ marginTop: 12 }}>If your return is denied (e.g., items not in original condition), we will contact you to discuss options. The item may be shipped back to you at your expense.</p>
        </Section>

        <Section title="Damaged or Defective Items">
          <p>If you receive a damaged, defective, or incorrect item, please contact us within 48 hours of delivery at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a>. Include your order number and photos of the issue. We will arrange a free return and send a replacement or issue a full refund, including shipping costs.</p>
        </Section>

        <Section title="Exchanges">
          <p>We offer exchanges for items of equal value, subject to availability. To request an exchange:</p>
          <ul style={listStyle}>
            <li>Email us at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a> with your order number and the item you would like to exchange for.</li>
            <li>If the desired item is available, we will provide exchange instructions.</li>
            <li>If the exchange item is a different price, we will charge or refund the difference accordingly.</li>
          </ul>
          <p style={{ marginTop: 12 }}>For the fastest service, we recommend placing a new order for the desired item and returning the original for a refund.</p>
        </Section>

        <Section title="Late or Missing Refunds">
          <p>If you have not received your refund after 10 business days:</p>
          <ul style={listStyle}>
            <li>Check your bank or credit card account again, as processing times vary.</li>
            <li>Contact your bank or card issuer, as there may be additional processing time.</li>
            <li>If you have done both and still have not received your refund, contact us at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a>.</li>
          </ul>
        </Section>

        <Section title="Contact Us">
          <p>For any questions about returns or refunds, please reach out:</p>
          <div style={{ marginTop: 16, color: 'var(--text-secondary)', lineHeight: 2 }}>
            <p>Email: <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a></p>
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
