export const metadata = {
  title: 'Contact Us | Fashionistas.ai',
  description: 'Get in touch with Fashionistas.ai — email, business address, hours, and contact form.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ maxWidth: 760, padding: '80px 32px 120px' }}>
      <h1 style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 16,
      }}>Contact Us</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        fontWeight: 300,
        marginBottom: 64,
        lineHeight: 1.8,
      }}>We would love to hear from you. Reach out with any questions, concerns, or feedback.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64 }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <InfoBlock label="Email">
            <a href="mailto:info@shopkurt.com" style={{ color: 'var(--accent)', fontSize: '1rem' }}>info@shopkurt.com</a>
          </InfoBlock>

          <InfoBlock label="Business Address">
            <p>Fashionistas.ai</p>
            <p>101 West Camino Real #605</p>
            <p>Boca Raton, FL 33432</p>
          </InfoBlock>

          <InfoBlock label="Business Hours">
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            <p>Saturday - Sunday: Closed</p>
          </InfoBlock>

          <InfoBlock label="Response Time">
            <p>We respond to all inquiries within 24 hours during business days.</p>
          </InfoBlock>
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: 'var(--accent)', margin: '0 auto' }} />

        {/* Contact Form */}
        <div>
          <h2 style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 32,
            textAlign: 'center',
          }}>Send Us a Message</h2>

          <form
            action="mailto:info@shopkurt.com"
            method="POST"
            encType="text/plain"
            style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520, margin: '0 auto' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                required
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                required
                style={inputStyle}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="SUBJECT"
              style={inputStyle}
            />

            <textarea
              name="message"
              placeholder="YOUR MESSAGE"
              rows={6}
              required
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: 140,
              }}
            />

            <button
              type="submit"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                padding: '16px 48px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
                alignSelf: 'center',
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div>
      <h3 style={{
        fontSize: '0.65rem',
        fontWeight: 400,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10,
      }}>{label}</h3>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        lineHeight: 1.9,
        fontWeight: 300,
      }}>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  background: 'transparent',
  border: '1px solid var(--border-hover)',
  padding: '14px 18px',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  letterSpacing: '0.05em',
  outline: 'none',
  width: '100%',
  borderRadius: 0,
};
