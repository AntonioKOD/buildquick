import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1B1F3B', // Midnight navy
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px',
          position: 'relative',
          border: '4px solid #F4C542',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, #F4C542 25%, transparent 25%, transparent 50%, #F4C542 50%, #F4C542 75%, transparent 75%, transparent)',
            backgroundSize: '12px 12px',
            opacity: 0.08,
            borderRadius: '28px',
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4C542', // Golden sand
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              marginBottom: '8px',
            }}
          >
            {'{CT}'}
          </div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'normal',
              opacity: 0.8,
            }}
          >
            codeWithToni
          </div>
        </div>
        
        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '8px',
            height: '8px',
            background: '#F4C542',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            width: '8px',
            height: '8px',
            background: '#F4C542',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
} 