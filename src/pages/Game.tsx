import { useState, useCallback, useRef, useEffect } from 'react'
import {
  tick as tickSnake,
  GRID_SIZE,
  isSamePos,
  type Direction,
  type Position,
} from '../game/snakeLogic'

const CELL_SIZE = 20
const INITIAL_SPEED = 150

function getRandomCell(): Position {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }
}

function getRandomCellExcluding(blocked: Position[]): Position {
  let pos = getRandomCell()
  while (blocked.some((b) => isSamePos(b, pos))) {
    pos = getRandomCell()
  }
  return pos
}

export default function Game() {
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [dead, setDead] = useState(false)
  const [score, setScore] = useState(0)
  const initialSnake: Position[] = [{ x: 10, y: 10 }]
  const [snake, setSnake] = useState<Position[]>(initialSnake)
  const [food, setFood] = useState<Position>(() =>
    getRandomCellExcluding(initialSnake)
  )
  const [direction, setDirection] = useState<Direction>('right')
  const nextDirRef = useRef<Direction>('right')
  const foodRef = useRef(food)
  const gameLoopRef = useRef<number>(0)
  foodRef.current = food

  const reset = useCallback(() => {
    const startSnake: Position[] = [{ x: 10, y: 10 }]
    setSnake(startSnake)
    setFood(getRandomCellExcluding(startSnake))
    setDirection('right')
    nextDirRef.current = 'right'
    setScore(0)
    setDead(false)
    setPaused(false)
    setPlaying(true)
  }, [])

  useEffect(() => {
    if (!playing || dead || paused) return

    gameLoopRef.current = window.setInterval(() => {
      const dir = nextDirRef.current
      const currentFood = foodRef.current
      setDirection(dir)
      setSnake((prev) => {
        const result = tickSnake(prev, currentFood, dir)
        if (result.gameOver) {
          setDead(true)
          setPlaying(false)
          return prev
        }
        if (result.ateFood) {
          setScore((s) => s + 1)
          setFood(() => {
            let newFood = getRandomCell()
            while (result.newSnake.some((s) => isSamePos(s, newFood))) {
              newFood = getRandomCell()
            }
            return newFood
          })
        }
        return result.newSnake
      })
    }, INITIAL_SPEED)

    return () => clearInterval(gameLoopRef.current)
  }, [playing, dead, paused])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (dead) return
      const key = e.key
      if (key === ' ') {
        e.preventDefault()
        if (playing) setPaused((p) => !p)
        return
      }
      if (paused) return
      if (key === 'ArrowUp' && direction !== 'down') nextDirRef.current = 'up'
      if (key === 'ArrowDown' && direction !== 'up') nextDirRef.current = 'down'
      if (key === 'ArrowLeft' && direction !== 'right') nextDirRef.current = 'left'
      if (key === 'ArrowRight' && direction !== 'left') nextDirRef.current = 'right'
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [direction, dead, paused, playing])

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Snake</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>Score:</span>
        <span
          id="score_value"
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--accent)',
          }}
        >
          {score}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>Length:</span>
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--success)',
          }}
        >
          {snake.length}
        </span>
        {!playing && !dead && (
          <button
            onClick={() => setPlaying(true)}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--success)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Play
          </button>
        )}
        {playing && !dead && (
          <button
            onClick={() => setPaused((p) => !p)}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
        )}
        {(playing || dead) && (
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: dead ? 'var(--danger)' : 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Restart
          </button>
        )}
      </div>
      {paused && playing && !dead && (
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Paused. Press Space or click Resume to continue.
        </p>
      )}
      {dead && (
        <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          Game over. Hit Restart to play again.
        </p>
      )}
      <div
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 8,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
          const x = i % GRID_SIZE
          const y = Math.floor(i / GRID_SIZE)
          const isSnake = snake.some((s) => s.x === x && s.y === y)
          const isFood = food.x === x && food.y === y
          return (
            <div
              key={i}
              style={{
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
                backgroundColor: isSnake
                  ? 'var(--success)'
                  : isFood
                    ? 'var(--danger)'
                    : 'transparent',
                borderRadius: isSnake || isFood ? 2 : 0,
              }}
            />
          )
        })}
      </div>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Use arrow keys to move
      </p>
    </section>
  )
}
