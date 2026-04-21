import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fashionistas.ai - Premium Trend-Led Shopping';
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
          background: 'linear-gradient(135deg, #050505 0%, #17110d 38%, #0a0908 100%)',
          fontFamily: 'serif',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            opacity: 0.35,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '18px' }}>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 600,
                color: '#f0ede8',
                letterSpacing: '0.04em',
              }}
            >
              Fashionistas
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 600,
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
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Trend-led shopping for shoes, accessories, and intent pages
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '18px',
            alignItems: 'stretch',
            width: '100%',
            position: 'relative',
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
                background: 'rgba(255,255,255,0.04)',
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
