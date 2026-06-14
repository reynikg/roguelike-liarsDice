let state = {
  bank: 200,
  currentWager: 0,
  playerDiceCount: 5,
  compDiceCount: 5,
  playerDice: [],
  compDice: [],
  currentBid: null,
  gameOver: false,
  isRolling: false
};

const els = {
  mainGame: document.getElementById('main-game'),
  bankDisplay: document.getElementById('bank-display'),
  wagerInput: document.getElementById('wager-amount'),
  btnSoul: document.getElementById('btn-soul'),
  playerSection: document.getElementById('player-area'),
  compSection: document.getElementById('comp-area'),
  playerDice: document.getElementById('player-dice'),
  compDice: document.getElementById('comp-dice'),
  compCountSpan: document.getElementById('comp-count'),
  bidDisplayContainer: document.getElementById('current-bid-display'),
  bidQtySpan: document.querySelector('#current-bid-display .qty'),
  bidFaceSpan: document.querySelector('#current-bid-display .face-val'),
  message: document.getElementById('game-message'),
  bidQtyInput: document.getElementById('bid-qty'),
  bidFaceInput: document.getElementById('bid-face'),
  btnBid: document.getElementById('btn-bid'),
  btnLiar: document.getElementById('btn-liar'),
  btnRestart: document.getElementById('btn-restart'),
  deathScreen: document.getElementById('death-screen'),
  btnResurrect: document.getElementById('btn-resurrect')
};

// Render function now wraps text in .die-content to fix mirroring
function renderDice(container, diceArray, isHidden = false) {
  container.innerHTML = ''; 
  diceArray.forEach(faceValue => {
    const dieEl = document.createElement('div');
    dieEl.className = 'die';
    
    let content = faceValue;
    if (state.isRolling || isHidden) {
      content = '?';
      if (state.isRolling) dieEl.classList.add('rolling');
      if (isHidden) dieEl.classList.add('hidden-die');
    }
    
    // Wrap inside span for correct 3D rotation
    dieEl.innerHTML = `<span class="die-content">${content}</span>`;
    container.appendChild(dieEl);
  });
}

function initGame() {
  state.playerDice = rollDiceArray(state.playerDiceCount);
  state.compDice = rollDiceArray(state.compDiceCount);
  state.currentBid = null;
  state.currentWager = 0;
  state.gameOver = false;
  state.isRolling = true;

  // Reset UI
  els.bankDisplay.textContent = `€${state.bank}`;
  els.wagerInput.disabled = false;
  els.wagerInput.max = state.bank;
  if (parseInt(els.wagerInput.value) > state.bank) {
    els.wagerInput.value = state.bank;
  }
  els.btnSoul.disabled = false;
  
  els.btnRestart.style.display = 'none';
  els.btnBid.style.display = 'inline-block';
  els.btnLiar.style.display = 'inline-block';
  els.btnBid.disabled = true;
  els.btnLiar.disabled = true;
  els.compCountSpan.textContent = state.compDiceCount;
  
  renderDice(els.playerDice, state.playerDice);
  renderDice(els.compDice, state.compDice, true);
  
  updateBidDisplay();
  els.message.textContent = "Rolling dice...";
  els.message.style.fontStyle = 'italic';

  setTimeout(() => {
    state.isRolling = false;
    renderDice(els.playerDice, state.playerDice); 
    renderDice(els.compDice, state.compDice, true); 
    els.message.textContent = "Set your wager and place the first bid.";
    els.message.style.fontStyle = 'normal';
    els.btnBid.disabled = false;
    els.playerSection.classList.add('active-turn');
  }, 1000); 
}

function rollDiceArray(count) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1).sort();
}

function updateBidDisplay() {
  const container = els.bidDisplayContainer;
  if (state.currentBid) {
    container.classList.remove('empty');
    container.classList.add('new-bid');
    setTimeout(() => container.classList.remove('new-bid'), 400);

    els.bidQtySpan.textContent = state.currentBid.qty;
    els.bidFaceSpan.textContent = `[${state.currentBid.face}]`;
    
    els.bidQtyInput.value = state.currentBid.qty;
    els.bidFaceInput.value = state.currentBid.face;
    els.bidQtyInput.min = state.currentBid.qty;
  } else {
    container.classList.add('empty');
    els.bidQtySpan.textContent = "--";
    els.bidFaceSpan.textContent = "[?]";
    els.bidQtyInput.value = 1;
    els.bidQtyInput.min = 1;
    els.bidFaceInput.value = 1;
  }
}

function isValidBid(qty, face) {
  if (!state.currentBid) return true;
  if (qty > state.currentBid.qty) return true;
  if (qty === state.currentBid.qty && face > state.currentBid.face) return true;
  return false;
}

// "My Soul" button logic
els.btnSoul.addEventListener('click', () => {
  if(!els.wagerInput.disabled) {
    els.wagerInput.value = state.bank;
  }
});

function handlePlayerBid() {
  if (state.gameOver || state.isRolling) return;

  // Lock in wager on first bid
  if (!state.currentBid) {
    let wager = parseInt(els.wagerInput.value);
    if (wager > state.bank) wager = state.bank;
    if (wager < 10) wager = 10;
    state.currentWager = wager;
    els.wagerInput.value = wager;
    els.wagerInput.disabled = true;
    els.btnSoul.disabled = true;
  }

  const qty = parseInt(els.bidQtyInput.value);
  const face = parseInt(els.bidFaceInput.value);

  if (!isValidBid(qty, face)) {
    els.message.textContent = "⚠️ Invalid bid. Increase quantity OR face value.";
    els.message.style.color = '#ff6b6b';
    return;
  }

  state.currentBid = { qty, face };
  els.message.style.color = 'var(--text-main)';
  updateBidDisplay();
  els.btnLiar.disabled = false;
  switchTurn('comp');
}

function switchTurn(nextTurn) {
  if (nextTurn === 'comp') {
    els.playerSection.classList.remove('active-turn');
    els.btnBid.disabled = true;
    els.btnLiar.disabled = true;
    els.compSection.classList.add('thinking');
    els.message.textContent = "Computer is studying its hand...";
    setTimeout(computerTurn, 1500 + Math.random() * 1000);
  } else {
    els.compSection.classList.remove('thinking');
    els.playerSection.classList.add('active-turn');
    els.btnBid.disabled = false;
    els.btnLiar.disabled = false;
  }
}

function computerTurn() {
  if (state.gameOver) return;

  const myCountOfFace = state.compDice.filter(d => d === state.currentBid.face).length;
  const knownDice = state.compDiceCount;
  const unknownDice = state.playerDiceCount;
  const estimatedTotal = myCountOfFace + Math.round(unknownDice / 6);

  if (state.currentBid.qty > estimatedTotal + 1 || (state.currentBid.qty > knownDice + unknownDice)) {
    els.message.innerHTML = `<span style="color:#ff6b6b; font-weight:700;">Computer calls LIAR!</span>`;
    setTimeout(() => resolveChallenge('comp'), 1000);
    return;
  }

  let newQty = state.currentBid.qty;
  let newFace = state.currentBid.face + 1;
  if (newFace > 6) { newQty++; newFace = 1; }

  state.currentBid = { qty: newQty, face: newFace };
  updateBidDisplay();
  els.message.innerHTML = `Computer bid <span style="color:white;font-weight:700;">${newQty} × [${newFace}]</span>. Your move.`;
  switchTurn('player');
}

function resolveChallenge(challenger) {
  state.gameOver = true;
  els.compSection.classList.remove('thinking');
  els.playerSection.classList.remove('active-turn');

  const compDiceElements = els.compDice.querySelectorAll('.die');
  compDiceElements.forEach((die, index) => {
    setTimeout(() => {
      die.classList.add('revealed');
      die.querySelector('.die-content').textContent = state.compDice[index];
    }, index * 150); 
  });

  const face = state.currentBid.face;
  const countP = state.playerDice.filter(d => d === face).length;
  const countC = state.compDice.filter(d => d === face).length;
  const totalCount = countP + countC;
  const bidFailed = totalCount < state.currentBid.qty;
  
  let playerWonRound = false;

  if (challenger === 'player') {
    playerWonRound = bidFailed;
  } else {
    playerWonRound = !bidFailed;
  }

  if (playerWonRound) {
    state.bank += state.currentWager;
  } else {
    state.bank -= state.currentWager;
  }

  setTimeout(() => {
    els.bankDisplay.textContent = `€${state.bank}`;
    
    let winnerText = playerWonRound ? 'You Won!' : 'You Lost!';
    let subMessage = `The bid was ${state.currentBid.qty} × [${face}]. There were ${totalCount} on the table.`;

    els.message.innerHTML = `
      <strong style="font-size:1.5rem; color:${playerWonRound ? '#4ade80' : '#ff6b6b'};">${winnerText}</strong><br>
      <span style="font-size:0.9rem; opacity:0.8;">${subMessage}</span>
    `;

    els.btnBid.style.display = 'none';
    els.btnLiar.style.display = 'none';

    // Check for Dark Souls death state
    if (state.bank <= 0) {
      triggerDarkSoulsDeath();
    } else {
      els.btnRestart.style.display = 'inline-block';
    }
  }, (state.compDiceCount * 150) + 500);
}

function triggerDarkSoulsDeath() {
  // Prevent any clicking on the main game
  els.mainGame.style.pointerEvents = 'none';
  els.mainGame.style.filter = 'blur(5px) brightness(0.2)';
  
  // Fade in overlay
  els.deathScreen.classList.add('active');
}

// Resurrect / Full Game Reset
els.btnResurrect.addEventListener('click', () => {
  els.deathScreen.classList.remove('active');
  els.mainGame.style.pointerEvents = 'auto';
  els.mainGame.style.filter = 'none';
  
  state.bank = 200;
  initGame();
});

els.btnBid.addEventListener('click', handlePlayerBid);
els.btnLiar.addEventListener('click', () => resolveChallenge('player'));
els.btnRestart.addEventListener('click', initGame);

initGame();