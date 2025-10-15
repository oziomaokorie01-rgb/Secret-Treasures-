function fakeEncrypt(data) {
  return btoa(data).slice(0, 6) + "...";
}

function drawCard() {
  return Math.floor(Math.random() * 11) + 1; // 1–11 like Blackjack
}

function startGame() {
  const log = document.getElementById("log");
  log.innerHTML = "🔐 Encrypting card draws via Arcium MPC (simulated)...<br>";

  // Player & dealer cards (encrypted)
  const playerCards = [drawCard(), drawCard()];
  const dealerCards = [drawCard(), drawCard()];

  log.innerHTML += `<br>👤 Player Cards: ${fakeEncrypt(playerCards.join(","))}`;
  log.innerHTML += `<br>🏦 Dealer Cards: ${fakeEncrypt(dealerCards.join(","))}`;

  // Simulate private compute: decrypt to decide winner
  const playerTotal = playerCards.reduce((a,b)=>a+b,0);
  const dealerTotal = dealerCards.reduce((a,b)=>a+b,0);

  setTimeout(() => {
    log.innerHTML += "<br><br>🤖 Running Arcium private compute (MPC)...";

    setTimeout(() => {
      let result = "";
      if (playerTotal > 21) result = "Dealer Wins (Player Bust)";
      else if (dealerTotal > 21) result = "Player Wins (Dealer Bust)";
      else if (playerTotal > dealerTotal) result = "Player Wins";
      else if (dealerTotal > playerTotal) result = "Dealer Wins";
      else result = "It's a Tie";

      log.innerHTML += `<br><br>✅ Final Result Revealed: <b>${result}</b>`;
      log.innerHTML += `<br><small>(All computation private — only result revealed)</small>`;
    }, 1500);
  }, 1000);
}
