/**
 * Pixelated project logos – 8-bit style matching the About avatar.
 */
const GRID = 8
const PIXEL = 6
const SIZE = GRID * PIXEL

const PALETTE: Record<string, string> = {
  _: 'transparent',
  C: '#00f5ff',
  P: '#a855f7',
  M: '#ec4899',
  D: '#2d2842',
  W: '#e8e6f0',
}

const LOGOS: Record<string, string[]> = {
  intro: [
    '___PP___',
    '__PPP___',
    '___P____',
    '___P____',
    '___P____',
    '___P____',
    '__PPP___',
    '_PPPP___',
  ],
  default: [
    '__DDDD__',
    '_DCCCCD_',
    'DC____CD',
    'DC____CD',
    'DC____CD',
    'DC____CD',
    '_DCCCCD_',
    '__DDDD__',
  ],
}

function normalizeGrid(rows: string[], size: number): string[][] {
  return rows.map((row) =>
    row.padEnd(size, '_').slice(0, size).split('')
  )
}

type Props = {
  variant?: string
}

export default function PixelProjectLogo({ variant = 'default' }: Props) {
  const rows = LOGOS[variant] ?? LOGOS.default
  const grid = normalizeGrid(rows, GRID)

  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        minWidth: SIZE,
        minHeight: SIZE,
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID}, ${PIXEL}px)`,
        gridTemplateRows: `repeat(${GRID}, ${PIXEL}px)`,
        imageRendering: 'pixelated',
      }}
    >
      {grid.flat().map((key, i) => (
        <div
          key={i}
          style={{
            width: PIXEL,
            height: PIXEL,
            backgroundColor: PALETTE[key] ?? PALETTE._,
          }}
        />
      ))}
    </div>
  )
}
