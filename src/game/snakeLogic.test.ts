import { describe, it, expect } from 'vitest'
import {
  tick,
  isSamePos,
  getNextHead,
  isOutOfBounds,
  GRID_SIZE,
  type Position,
  type Direction,
} from './snakeLogic'

describe('snakeLogic', () => {
  describe('tick - growth when eating food', () => {
    it('when snake eats food, length increases by 1 (len 1 -> 2)', () => {
      const snake: Position[] = [{ x: 10, y: 10 }]
      const food: Position = { x: 11, y: 10 }
      const result = tick(snake, food, 'right')
      expect(result.ateFood).toBe(true)
      expect(result.gameOver).toBe(false)
      expect(result.newSnake).toHaveLength(snake.length + 1)
      expect(result.newSnake).toHaveLength(2)
      expect(result.newSnake[0]).toEqual(food)
      expect(result.newSnake[1]).toEqual(snake[0])
    })

    it('when snake eats food, length increases by 1 (len 2 -> 3)', () => {
      const snake: Position[] = [
        { x: 11, y: 10 },
        { x: 10, y: 10 },
      ]
      const food: Position = { x: 12, y: 10 }
      const result = tick(snake, food, 'right')
      expect(result.ateFood).toBe(true)
      expect(result.newSnake).toHaveLength(3)
      expect(result.newSnake[0]).toEqual(food)
    })

    it('when snake does not eat food, length stays the same', () => {
      const snake: Position[] = [
        { x: 11, y: 10 },
        { x: 10, y: 10 },
      ]
      const food: Position = { x: 5, y: 5 }
      const result = tick(snake, food, 'right')
      expect(result.ateFood).toBe(false)
      expect(result.newSnake).toHaveLength(2)
    })
  })

  describe('isSamePos', () => {
    it('returns true for same position', () => {
      expect(isSamePos({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true)
    })
    it('returns false for different position', () => {
      expect(isSamePos({ x: 1, y: 2 }, { x: 1, y: 3 })).toBe(false)
    })
  })

  describe('getNextHead', () => {
    it('moves right', () => {
      expect(getNextHead({ x: 10, y: 10 }, 'right', false)).toEqual({
        x: 11,
        y: 10,
      })
    })
    it('moves into wall when not wrapping', () => {
      const pos = getNextHead({ x: GRID_SIZE - 1, y: 10 }, 'right', false)
      expect(pos.x).toBe(GRID_SIZE)
      expect(isOutOfBounds(pos)).toBe(true)
    })
  })
})
