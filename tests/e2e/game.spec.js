import { test, expect } from '@playwright/test';

async function getStartingPlayer(page) {
  return await page.locator('#currentPlayer').getAttribute('data-player');
}

async function getScores(page) {
  const x = await page.locator('#scoreX').textContent();
  const o = await page.locator('#scoreO').textContent();
  return { x: Number(x), o: Number(o) };
}

async function playFirstPlayerWin(page) {
  const first = await getStartingPlayer(page);

  await page.click('[data-index="0"]');
  await page.click('[data-index="3"]');
  await page.click('[data-index="1"]');
  await page.click('[data-index="4"]');
  await page.click('[data-index="2"]');
  return first;
}

function other(player) {
  return player === 'X' ? 'O' : 'X';
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders 9 empty cells', async ({ page }) => {
  const cells = page.locator('.board__cell');
  await expect(cells).toHaveCount(9);
});

test('scores start at 0 for both players', async ({ page }) => {
  const scores = await getScores(page);
  expect(scores.x).toBe(0);
  expect(scores.o).toBe(0);
});

test('places correct mark on first and second click', async ({ page }) => {
  const first = await getStartingPlayer(page);
  const second = other(first);

  await page.click('[data-index="0"]');
  await expect(page.locator('[data-index="0"]')).toHaveText(first);

  await page.click('[data-index="1"]');
  await expect(page.locator('[data-index="1"]')).toHaveText(second);
});

test('cannot click a cell twice', async ({ page }) => {
  const first = await getStartingPlayer(page);

  await page.click('[data-index="4"]');
  await page.locator('[data-index="4"]').dispatchEvent('click');
  await expect(page.locator('[data-index="4"]')).toHaveText(first);
});

test('winning player score increases by 1 after anotherGame', async ({ page }) => {
  const scoresBefore = await getScores(page);
  const winner = await playFirstPlayerWin(page);

  await page.click('#anotherGameBtn');

  const scoresAfter = await getScores(page);

  if (winner === 'X') {
    expect(scoresAfter.x).toBe(scoresBefore.x + 1);
    expect(scoresAfter.o).toBe(scoresBefore.o);
  } else {
    expect(scoresAfter.o).toBe(scoresBefore.o + 1);
    expect(scoresAfter.x).toBe(scoresBefore.x);
  }
});

test('losing player score does not increase after anotherGame', async ({ page }) => {
  const winner = await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');

  const scores = await getScores(page);
  const loserScore = winner === 'X' ? scores.o : scores.x;
  expect(loserScore).toBe(0);
});

test('ends in a tie', async ({ page }) => {
  const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  for (const i of moves) {
    await page.click(`[data-index="${i}"]`);
  }
  await expect(page.locator('#boardBanner')).toContainText("No Winner - It's a tie!");
});

test('reset clears board', async ({ page }) => {
  await page.click('[data-index="0"]');
  await page.click('[data-index="1"]');
  await page.click('#resetBtn');

  for (let i = 0; i < 9; i++) {
    await expect(page.locator(`[data-index="${i}"]`)).toBeEmpty();
  }
});

test('scores accumulate across multiple games', async ({ page }) => {
  await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');

  await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');

  const scores = await getScores(page);
  expect(scores.x + scores.o).toBe(2);
});

test('reset clears both scores back to 0', async ({ page }) => {
  await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');

  await page.click('#resetBtn');

  const scores = await getScores(page);
  expect(scores.x).toBe(0);
  expect(scores.o).toBe(0);
});

test('anotherGame clears the board but keeps scores', async ({ page }) => {
  const winner = await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');

  for (let i = 0; i < 9; i++) {
    await expect(page.locator(`[data-index="${i}"]`)).toBeEmpty();
  }

  const scores = await getScores(page);
  const winnerScore = winner === 'X' ? scores.x : scores.o;
  expect(winnerScore).toBe(1);
});

test('tie rematch does not change scores', async ({ page }) => {
  const scoresBefore = await getScores(page);

  const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  for (const i of moves) {
    await page.click(`[data-index="${i}"]`);
  }

  await page.click('#rematchBtn');

  const scoresAfter = await getScores(page);
  expect(scoresAfter.x).toBe(scoresBefore.x);
  expect(scoresAfter.o).toBe(scoresBefore.o);
});

test('reset clears board after multiple games', async ({ page }) => {
  await playFirstPlayerWin(page);
  await page.click('#anotherGameBtn');
  await page.click('#resetBtn');

  for (let i = 0; i < 9; i++) {
    await expect(page.locator(`[data-index="${i}"]`)).toBeEmpty();
  }
});