/**
 * 8-bit style pixel-art avatar. Cartoon face with eyes, hair, nose, lips.
 */
const GRID_SIZE = 16
const PIXEL_SIZE = 14

const PALETTE: Record<string, string> = {
  _: 'transparent',
  F: '#f5d0b0',
  D: '#e8b896',
  H: '#3d2c5c',
  W: '#ffffff',
  E: '#1a1b2e',
  N: '#e0b090',
  L: '#c45c5c',
}

const PIXEL_ART = [
  '____HHHHHHHH____',
  '__HHHHHHHHHHHH__',
  '_HHHFFFFFFFFHHH_',
  '_HHFFFFFFFFFFHH_',
  '_HHFFFFFFFFFFFHH_',
  '_HFFWWWFFWWWFFH_',
  '_HFFWEEFFEEWFFH_',
  '_HFFWWWFFWWWFFH_',
  '_HFFFFFNNNFFFFH_',
  '_FFFFFFFFFFFFFHH_',
  '_FFFFFFLLFFFFF_',
  '_HFFFFFLLLFFFFF_',
  '_HFFFFFFFFFFF_',
  '_HFFFFFFFFFFFHH_',
  '___HHHHHHHHHH___',
  '_______________',
].map((row) => row.split(''))

const SIZE = GRID_SIZE * PIXEL_SIZE

export default function PixelAvatar() {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
        imageRendering: 'pixelated',
      }}
    >
      {PIXEL_ART.flat().map((key, i) => (
        <div
          key={i}
          style={{
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: PALETTE[key] ?? PALETTE._,
          }}
        />
      ))}
    </div>
  )
}
