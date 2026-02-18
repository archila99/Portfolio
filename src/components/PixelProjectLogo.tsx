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
  video: [
    '_D_D_D_D',
    'PPPPPPPP',
    'PCCCCCCP',
    'PCCCCCCP',
    'PCCCCCCP',
    'PPPPPPPP',
    '_D_D_D_D',
    '________',
  ],
  nasa: [
    '___PP___',
    '__PPPP__',
    '_PPCCPP_',
    'PPCCCCPP',
    '__PPCCPP',
    '___PP___',
    '__PPPP__',
    '_PP__PP_',
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
  movie: [
    '__PPP__P',
    '_PPCCCP_',
    'PPCCCCPP',
    'PPCCCCPP',
    '_PPCCCP_',
    '__PPPP__',
    '___PP___',
    '__PPPP__',
  ],
  travel: [
    '___CC___',
    '__CCCC__',
    '_CCCCCC_',
    'CCCCCCCC',
    '_C____C_',
    '_C____C_',
    '__CCCC__',
    '___CC___',
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
