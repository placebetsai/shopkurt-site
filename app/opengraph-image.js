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
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #050505 0%, #1a1412 50%, #050505 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
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
              fontSize: '72px',
              fontWeight: 200,
              color: '#c9a96e',
            }}
          >
            .ai
          </span>
        </div>
        <div
          style={{
            width: '80px',
            height: '1px',
            background: '#c9a96e',
            marginBottom: '24px',
          }}
        />
        <span
          style={{
            fontSize: '24px',
            fontWeight: 300,
            color: '#8a8580',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Curated Women's Fashion, Beauty & Accessories
        </span>
      </div>
    ),
    { ...size }
  );
}
