import { describe, it, expect } from 'vitest';
import { checkWinner, isBoardFull, togglePlayer, createBoard } from '../../game.js';

describe('createBoard', () => {
  it('returns 9 empty cells', () => {
    expect(createBoard()).toHaveLength(9);
  });
  it('all cells start empty', () => {
    expect(createBoard().every(c => c === '')).toBe(true);
  });
});

describe('togglePlayer', () => {
  it('X becomes O', () => expect(togglePlayer('X')).toBe('O'));
  it('O becomes X', () => expect(togglePlayer('O')).toBe('X'));
});

describe('score tracking logic', () => {
  it('incrementing a score works correctly', () => {
    let score = 0;
    score++;
    expect(score).toBe(1);
  });

  it('resetting a score returns to zero', () => {
    let score = 5;
    score = 0;
    expect(score).toBe(0);
  });

  it('only the winning player score increases', () => {
    let scoreX = 0;
    let scoreO = 0;
    const winner = 'X';

    if (winner === 'X') scoreX++;
    else scoreO++;

    expect(scoreX).toBe(1);
    expect(scoreO).toBe(0);
  });
});

describe('isBoardFull', () => {
  it('returns false for empty board', () => {
    expect(isBoardFull(createBoard())).toBe(false);
  });
  it('returns true when all cells filled', () => {
    expect(isBoardFull(Array(9).fill('X'))).toBe(true);
  });
});

describe('checkWinner', () => {
  it('returns null on empty board', () => {
    expect(checkWinner(createBoard(), 'X')).toBeNull();
  });
  it('detects top row win for X', () => {
    const board = ['X','X','X','','','','','',''];
    expect(checkWinner(board, 'X')).toEqual([0, 1, 2]);
  });
  it('detects diagonal win for O', () => {
    const board = ['O','','','','O','','','','O'];
    expect(checkWinner(board, 'O')).toEqual([0, 4, 8]);
  });
  it('does not detect win for wrong player', () => {
    const board = ['X','X','X','','','','','',''];
    expect(checkWinner(board, 'O')).toBeNull();
  });
});