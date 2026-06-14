# Contributing

Thanks for your interest in improving Liar's Dice — The Speakeasy. This is a small personal project, so the process is light.

## Getting started

1. Fork and clone the repository.
2. Open `index.html` in a browser to play, or serve the folder locally (`python3 -m http.server 8000`).
3. There is no build step or dependency install — edit the HTML, CSS, and JS directly and refresh.

## Project layout

- `index.html` — markup and layout.
- `style.css` — theming, dice styling, and animations.
- `game.js` — game state, turn flow, computer AI, and resolution logic.

## Making changes

- Keep the project dependency-free and framework-free unless there's a strong reason otherwise.
- Match the existing style: two-space indentation, descriptive names, and the existing `state` / `els` structure in `game.js`.
- Test your changes by playing through several full rounds, including a win, a loss, a called bluff, and a trip to the death screen.
- Update [CHANGELOG.md](CHANGELOG.md) under **[Unreleased]** and tick off any relevant items in [TODO.md](TODO.md).

## Submitting

- Use a descriptive branch name (e.g. `feature/wild-aces`).
- Keep commits focused and write clear commit messages.
- Open a pull request describing what changed and how you tested it.

## Ideas

Not sure where to start? [TODO.md](TODO.md) lists open ideas — the roguelike progression items are the most impactful.
