# Tic Tac Toe

A responsive Tic Tac Toe app built with HTML, CSS and JavaScript.
It includes a live scoreboard, random starting player, and full test coverage
using Vitest (unit) and Playwright (end-to-end).

---

## Project Structure

tic-tac-toe/
├── index.html
├── style.css
├── game.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── .gitignore
├── tests/
│   ├── unit/
│   │   └── game.test.js
│   └── e2e/
│       └── game.spec.js
└── workflows/
    └── ci.yml

---

## Prerequisites

Make sure you have Node.js installed before starting.
You can check by running:
node -v
npm -v

You will need Node.js v20 or higher.
Download it from [nodejs.org](https://nodejs.org) if needed.

---

## Installation

Clone the repository and install dependencies:

git clone https://github.com/YOUR_USERNAME/tic-tac-toe.git
cd tic-tac-toe
npm install


Then install the Playwright browser:

npx playwright install --with-deps chromium

---

## Running the App

Open "index.html" directly in your browser

---

## Running Tests

### Unit Tests (Vitest)

Tests the core game logic functions in isolation 

npm run test:unit


### End-to-End Tests (Playwright)

Tests the full app by clicking cells, winning,
ties, scoring and resetting too.

npm run test:e2e


### Run Both

npm test


---

## CI/CD

The project uses GitHub Actions to automatically run all tests on
push to `main`. The app is deployed to GitHub Pages only when
all tests pass.