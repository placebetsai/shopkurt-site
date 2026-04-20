import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fashionistas.ai - Curated Women\'s Fashion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #050505 0%, #120f0d 45%, #050505 100%)',
          fontFamily: 'sans-serif',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '18px' }}>
            <span
              style={{
                fontSize: '70px',
                fontWeight: 200,
                color: '#f0ede8',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Fashionistas
            </span>
            <span
              style={{
                fontSize: '70px',
                fontWeight: 200,
                color: '#c9a96e',
              }}
            >
              .ai
            </span>
          </div>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#c9a96e',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
            }}
          >
            Shoes, Accessories & Affordable Style
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '18px',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {[
            'Interview Shoes',
            'Vacation Sandals',
            'Trending Accessories',
          ].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flex: 1,
                border: '1px solid rgba(201,169,110,0.25)',
                background: 'rgba(255,255,255,0.02)',
                padding: '20px 22px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#f0ede8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
