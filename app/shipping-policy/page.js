export const metadata = {
  title: 'Shipping Policy | Fashionistas.ai',
  description: 'Shipping policy for Fashionistas.ai — delivery times, shipping costs, tracking, and international shipping information.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="container" style={{ maxWidth: 760, padding: '80px 32px 120px' }}>
      <h1 style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
      }}>Shipping Policy</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        marginBottom: 64,
      }}>Last updated: April 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Section title="Processing Time">
          <p>All orders are processed within 1-3 business days after payment is confirmed. Orders placed on weekends or holidays will be processed on the next business day. You will receive a confirmation email once your order has been placed, and a shipping notification with tracking information once your order has shipped.</p>
        </Section>

        <Section title="Domestic Shipping (United States)">
          <p>We offer the following shipping options for orders within the United States:</p>
          <div style={{
            marginTop: 16,
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}>
            <div style={tableRowStyle}>
              <span style={{ color: 'var(--text)', fontWeight: 400 }}>Standard Shipping</span>
              <span>5-12 business days</span>
            </div>
            <div style={{ ...tableRowStyle, borderTop: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text)', fontWeight: 400 }}>Expedited Shipping</span>
              <span>3-5 business days</span>
            </div>
          </div>
          <p style={{ marginTop: 16 }}>Delivery times are estimates and are not guaranteed. Actual delivery times may vary based on your location and carrier conditions.</p>
        </Section>

        <Section title="Free Shipping">
          <p>We offer free standard shipping on all orders over $50 within the United States. Orders under $50 will be charged a flat-rate shipping fee displayed at checkout.</p>
        </Section>

        <Section title="International Shipping">
          <p>We ship to select international destinations. International shipping details:</p>
          <ul style={listStyle}>
            <li>Estimated delivery: 7-21 business days, depending on the destination country.</li>
            <li>Shipping costs are calculated at checkout based on destination and package weight.</li>
            <li>International customers are responsible for any customs duties, import taxes, or fees imposed by their country. These charges are not included in our shipping costs.</li>
            <li>We are not responsible for delays caused by customs processing.</li>
          </ul>
        </Section>

        <Section title="Shipping Carriers">
          <p>We partner with trusted shipping carriers to deliver your orders safely and efficiently, including:</p>
          <ul style={listStyle}>
            <li>USPS (United States Postal Service)</li>
            <li>UPS (United Parcel Service)</li>
            <li>FedEx</li>
            <li>DHL (for select international shipments)</li>
          </ul>
          <p style={{ marginTop: 12 }}>The specific carrier used may vary depending on your location, package size, and shipping method selected.</p>
        </Section>

        <Section title="Order Tracking">
          <p>Once your order ships, you will receive a shipping confirmation email with a tracking number and a link to track your package. You can use this tracking number on the carrier's website to monitor your delivery status in real time.</p>
          <p style={{ marginTop: 12 }}>If you do not receive a shipping confirmation within 5 business days of placing your order, please contact us at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a>.</p>
        </Section>

        <Section title="Lost or Damaged Packages">
          <p>If your package appears to be lost or is delivered damaged:</p>
          <ul style={listStyle}>
            <li><strong style={{ color: 'var(--text)' }}>Lost Packages:</strong> If tracking shows your package has not been updated for more than 7 business days, or if it shows delivered but you have not received it, please contact us. We will work with the shipping carrier to locate your package and, if necessary, send a replacement or issue a refund.</li>
            <li><strong style={{ color: 'var(--text)' }}>Damaged Packages:</strong> If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or full refund at no additional cost to you.</li>
          </ul>
        </Section>

        <Section title="Incorrect Shipping Address">
          <p>Please ensure your shipping address is correct at the time of checkout. We are not responsible for orders shipped to an incorrect address provided by the customer. If you realize your address is incorrect after placing your order, contact us immediately at <a href="mailto:info@fashionistas.ai" style={{ color: 'var(--accent)' }}>info@fashionistas.ai</a> and we will do our best to update it before the order ships.</p>
        </Section>

        <Section title="P.O. Boxes and APO/FPO Addresses">
          <p>We can ship to P.O. Boxes and APO/FPO addresses via USPS. Please note that delivery to these addresses may take longer than standard delivery estimates.</p>
        </Section>

        <Section title="Contact Us">
          <p>For shipping questions or concerns, please reach out:</p>
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

const tableRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '14px 20px',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
};
