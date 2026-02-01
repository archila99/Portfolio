export const GRID_SIZE = 20

export type Direction = 'up' | 'down' | 'left' | 'right'
export type Position = { x: number; y: number }

export function isSamePos(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y
}

export function getNextHead(
  head: Position,
  dir: Direction,
  wrap: boolean
): Position {
  let x: number
  let y: number
  switch (dir) {
    case 'up':
      x = head.x
      y = head.y - 1
      break
    case 'down':
      x = head.x
      y = head.y + 1
      break
    case 'left':
      x = head.x - 1
      y = head.y
      break
    case 'right':
      x = head.x + 1
      y = head.y
      break
  }
  if (wrap) {
    x = (x + GRID_SIZE) % GRID_SIZE
    y = (y + GRID_SIZE) % GRID_SIZE
  }
  return { x, y }
}

export function isOutOfBounds(pos: Position): boolean {
  return (
    pos.x < 0 ||
    pos.x >= GRID_SIZE ||
    pos.y < 0 ||
    pos.y >= GRID_SIZE
  )
}

export type TickResult = {
  newSnake: Position[]
  ateFood: boolean
  gameOver: boolean
}

/**
 * Pure tick: given current snake, food position, and direction,
 * returns the next snake state. When ateFood is true, newSnake.length === prevSnake.length + 1.
 */
export function tick(
  prevSnake: Position[],
  food: Position,
  dir: Direction
): TickResult {
  const head = prevSnake[0]
  const nextHead = getNextHead(head, dir, false)

  if (isOutOfBounds(nextHead)) {
    return { newSnake: prevSnake, ateFood: false, gameOver: true }
  }

  const ateFood = isSamePos(food, nextHead)
  const bodyToCheck = ateFood ? prevSnake : prevSnake.slice(0, -1)
  const hitSelf = bodyToCheck.some((seg) => isSamePos(seg, nextHead))

  if (hitSelf) {
    return { newSnake: prevSnake, ateFood: false, gameOver: true }
  }

  if (ateFood) {
    const grownSnake: Position[] = [nextHead, ...prevSnake]
    return { newSnake: grownSnake, ateFood: true, gameOver: false }
  }

  return {
    newSnake: [nextHead, ...prevSnake.slice(0, -1)],
    ateFood: false,
    gameOver: false,
  }
}
