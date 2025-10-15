// --- Simulate Arcium Private Compute ---
const rewards = [
  "💎 Encrypted Sapphire",
  "🪙 Secret Solana Token",
  "🎁 Hidden NFT Fragment",
  "🌌 Shadow Key",
  "🔥 Privacy Medal"
];

document.getElementById("connect").addEventListener("click", () => {
  alert("Simulated Phantom Wallet connected ✅");
});

document.getElementById("discover").addEventListener("click", () => {
  const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
  document.getElementById("reward").textContent = randomReward;
  document.getElementById("result").classList.remove("hidden");
  alert(`Encrypted computation complete. You discovered: ${randomReward}`);
});
