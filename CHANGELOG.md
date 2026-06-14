# Changelog

All notable changes to this project are documented here. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/), and this project aims to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

Planned work is tracked in [TODO.md](TODO.md).

## [0.1.0] — 2026-04-29

First playable version of Liar's Dice with the speakeasy theme.

### Added

- Core Liar's Dice round loop: roll, bid, and challenge against a computer opponent.
- Bidding system with quantity and face-value inputs and strict raise validation.
- Computer AI that estimates dice totals to decide between raising and calling LIAR.
- Wager system with a per-round bank, a €10 minimum, and a "My Soul" all-in button.
- Bank tracking that pays out or deducts the wager on each resolved round.
- Animated dice: rolling shake, bid pop-in, and a 3D flip reveal for the computer's hand.
- Dark Souls–style death screen triggered when the bank reaches €0, with a Resurrect button that restores the bank to €200.
- Speakeasy visual theme using the Crimson Text serif font, warm wood textures, and a table vignette.

### Project setup

- Added MIT License (copyright 2026 reynikg).
- Added `.gitattributes` for line-ending normalization.
