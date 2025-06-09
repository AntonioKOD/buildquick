import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
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
          borderRadius: '6px',
          position: 'relative',
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
            backgroundSize: '4px 4px',
            opacity: 0.1,
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4C542', // Golden sand
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
        >
          {'{T}'}
        </div>
        
        {/* Small accent dot */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            width: '3px',
            height: '3px',
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