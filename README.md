# Liar's Dice — The Speakeasy

A browser-based take on the classic bluffing game **Liar's Dice**, wrapped in a moody 1920s speakeasy theme. Wager your coin (or your very soul) against a calculating computer opponent across a felt-and-mahogany table. Lose it all and a Dark Souls–style death screen reminds you of your hubris.

Built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step.

## Gameplay

Each round, you and the computer each roll five hidden dice. Players take turns making bids about how many dice of a given face value are on the table across *both* hands. A bid is a claim like "there are four 5s." On your turn you can either raise the bid or call your opponent a liar.

When **"LIAR!"** is called, all dice are revealed and counted:

- If the actual count meets or exceeds the bid, the bid stands and the **bidder** wins.
- If the count falls short, the bid was a bluff and the **challenger** wins.

The round winner collects the wager; the loser pays it from their bank.

### Raising a bid

A new bid must be strictly higher than the standing bid. It is valid if either:

- the **quantity** is greater than the current quantity, or
- the **quantity** is equal and the **face value** is higher.

### Wagering

At the start of each round you set a wager (minimum €10, up to your full bank). Feeling reckless? The **"My Soul"** button pushes your entire bank onto the table in a single bid. The wager locks in the moment you place your first bid of the round.

### The death screen

Drop to €0 or below and the table fades to black: *"You really did bet your soul..."* A lone **Resurrect** button restores your bank to €200 so you can try your luck again.

## How to play

No installation or build tools are required.

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.

That's it. To play from a local server instead (useful on some browsers), you can run one of:

```bash
# Python
python3 -m http.server 8000

# Node (if you have it)
npx serve
```

Then visit `http://localhost:8000`.

## Controls

| Control | Action |
| --- | --- |
| **Wager** field | Set the stake for the round (€10 to your full bank) |
| **My Soul** | Set the wager to your entire bank |
| **Quantity** / **Face** | Choose the dice count and face value for your bid |
| **Place Bid** | Submit your bid and pass the turn to the computer |
| **Call LIAR!** | Challenge the standing bid and reveal all dice |
| **Next Round** | Start a fresh round after one resolves |
| **Resurrect** | Restart with a fresh €200 bank after going broke |

## Project structure

```
roguelike-liarsDice/
├── index.html    # Markup and layout for the table, controls, and death screen
├── style.css     # Speakeasy theming, dice rendering, and animations
├── game.js       # Game state, turn logic, computer AI, and bid resolution
├── LICENSE       # MIT License
└── README.md     # This file
```

## How the computer plays

The opponent's logic lives in `computerTurn()` in `game.js`. It counts how many of the bid's face value it holds in its own hand, estimates the likely number hidden in your hand (roughly one in six per die), and compares that to the standing bid. If the bid looks too aggressive to be true, it calls **LIAR!**. Otherwise it raises — bumping the face value first and rolling over into a higher quantity when it passes 6.

## Built with

- HTML5
- CSS3 (custom properties, keyframe animations, 3D transforms for dice reveals)
- Vanilla JavaScript (no dependencies)
- [Crimson Text](https://fonts.google.com/specimen/Crimson+Text) from Google Fonts

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 reynikg.
