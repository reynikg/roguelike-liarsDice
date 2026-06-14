# TODO

A running list of ideas, improvements, and known issues. Roughly grouped by theme; not in strict priority order.

## Roguelike progression (the headline feature)

The repository is named *roguelike-liarsDice*, but the current build is a single-round betting game — dice counts stay fixed and there is no run structure. Bringing in the roguelike loop is the biggest opportunity:

- [ ] Remove a die from the loser's hand each round so hands shrink over a run.
- [ ] End the run when a side loses all dice, rather than only on bank depletion.
- [ ] Add escalating opponents or rounds (a "ladder" of computer players).
- [ ] Introduce run-based upgrades, perks, or modifiers between rounds.
- [ ] Track and display a run summary (rounds survived, coin won, best streak).

## Gameplay rules

- [ ] Add an option for wild Aces (1s counting toward any face), a common Liar's Dice variant.
- [ ] Support an "exact" call (spot-on) for a bonus payout.
- [ ] Let the player choose who bids first each round.
- [ ] Validate the wager input against non-numeric and empty values more robustly.

## Computer AI

- [ ] Make raises less predictable — the AI currently always bumps the face value first.
- [ ] Vary bluffing behaviour by difficulty level.
- [ ] Have the AI sometimes raise quantity aggressively to apply pressure.

## UI / UX

- [ ] Add mobile and small-screen responsiveness (layout currently assumes a tall desktop viewport).
- [ ] Render dice as pip faces instead of numerals for a more authentic look.
- [ ] Add sound effects (dice shake, coin, the death sting) with a mute toggle.
- [ ] Show a running bid history for the current round.
- [ ] Add a brief how-to-play / rules overlay for new players.

## Persistence & polish

- [ ] Persist the bank and stats between sessions (e.g. via a backend, since artifacts cannot use browser storage).
- [ ] Add a settings panel (starting bank, minimum wager, wild-aces toggle).
- [ ] Write basic tests for `isValidBid`, bid resolution counting, and the AI decision.

## Known issues

- [ ] Dice counts (`playerDiceCount` / `compDiceCount`) are defined and tracked but never decrease, so the "Dice Left" display is currently static.
- [ ] The bank resets to €200 on every page reload because there is no persistence.
