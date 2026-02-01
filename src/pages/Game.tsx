import { useState, useCallback, useRef, useEffect } from 'react'
import {
  tick as tickSnake,
  GRID_SIZE,
  isSamePos,
  type Direction,
  type Position,
} from '../game/snakeLogic'

const CELL_SIZE_DESKTOP = 20
const CELL_SIZE_MOBILE = 14
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
  const [isMobile, setIsMobile] = useState(false)
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
  const cellSize = isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const fn = () => setIsMobile(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const setDir = useCallback((d: Direction) => {
    if (dead) return
    if (d === 'up' && direction !== 'down') nextDirRef.current = 'up'
    if (d === 'down' && direction !== 'up') nextDirRef.current = 'down'
    if (d === 'left' && direction !== 'right') nextDirRef.current = 'left'
    if (d === 'right' && direction !== 'left') nextDirRef.current = 'right'
  }, [direction, dead])

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

  const btnBase = {
    padding: '0.5rem 1.25rem',
    border: '1px solid var(--border)',
    borderRadius: 8,
    fontWeight: 600,
  }

  return (
    <section className="game-page">
      <div className="game-container">
        <h1 className="game-title">Snake</h1>
        <div className="game-score-bar">
          <div className="game-stat">
            <span className="game-stat-label">Score</span>
            <span id="score_value" className="game-stat-value game-stat-accent">
              {score}
            </span>
          </div>
          <div className="game-stat">
            <span className="game-stat-label">Length</span>
            <span className="game-stat-value game-stat-success">
              {snake.length}
            </span>
          </div>
          <div className="game-buttons">
            {!playing && !dead && (
              <button
                onClick={() => setPlaying(true)}
                style={{ ...btnBase, backgroundColor: 'var(--success)', color: 'var(--bg)', border: 'none' }}
              >
                Play
              </button>
            )}
            {playing && !dead && (
              <button
                onClick={() => setPaused((p) => !p)}
                style={{ ...btnBase, backgroundColor: 'var(--surface)', color: 'var(--text)' }}
              >
                {paused ? 'Resume' : 'Pause'}
              </button>
            )}
            {(playing || dead) && (
              <button
                onClick={reset}
                style={{
                  ...btnBase,
                  backgroundColor: dead ? 'var(--danger)' : 'var(--surface)',
                  color: 'var(--text)',
                }}
              >
                Restart
              </button>
            )}
          </div>
        </div>
        {paused && playing && !dead && (
          <p className="game-message game-message-muted">Paused. Tap Resume or press Space.</p>
        )}
        {dead && (
          <p className="game-message game-message-danger">Game over. Tap Restart to play again.</p>
        )}
        <div
          className="game-board"
          style={{
            width: GRID_SIZE * cellSize,
            height: GRID_SIZE * cellSize,
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${cellSize}px)`,
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
                  width: cellSize - 1,
                  height: cellSize - 1,
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
        <div className="game-arrows">
          <div className="game-arrows-row">
            <span />
            <button
              type="button"
              className="game-arrow-btn"
              onClick={() => setDir('up')}
              aria-label="Up"
            >
              ▲
            </button>
            <span />
          </div>
          <div className="game-arrows-row">
            <button
              type="button"
              className="game-arrow-btn"
              onClick={() => setDir('left')}
              aria-label="Left"
            >
              ◀
            </button>
            <span />
            <button
              type="button"
              className="game-arrow-btn"
              onClick={() => setDir('right')}
              aria-label="Right"
            >
              ▶
            </button>
          </div>
          <div className="game-arrows-row">
            <span />
            <button
              type="button"
              className="game-arrow-btn"
              onClick={() => setDir('down')}
              aria-label="Down"
            >
              ▼
            </button>
            <span />
          </div>
        </div>
        <p className="game-hint">
          {isMobile ? 'Use arrows or swipe' : 'Use arrow keys to move'}
        </p>
      </div>
    </section>
  )
}
