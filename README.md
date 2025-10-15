# 🃏 ShadowCards — Private Blackjack (Arcium + Solana Demo)

## 💡 Overview
ShadowCards demonstrates how Arcium’s encrypted compute can power *hidden-information games* on Solana.  
Each player’s cards are encrypted and privately compared using MPC, revealing only the final outcome.

## ⚙️ Features
- 🔒 Encrypted player hands (simulated)
- 🎲 MPC-based private randomness
- 🤖 Private result reveal
- 📱 Built fully on mobile via Replit (no liquidity, no wallets)

## 🧠 Why Arcium
Arcium enables encrypted compute — allowing gameplay logic (like comparing cards) to happen *privately* without revealing inputs.  
This ensures fairness and transparency while maintaining privacy for all players.

## 🚀 Future Integration
To connect this with Solana:
1. Replace fakeEncrypt() with Arcium SDK’s real `encryptInputs()`
2. Send encrypted game state to Solana smart contract
3. Use Arcium MXE to compute the winner privately
4. Post verified result on-chain

## 🎯 Submission Info
- **Track:** Hidden-Information Games
- **Project:** ShadowCards — Encrypted Blackjack
- **Platform:** Solana + Arcium (simulated)
- **Built on:** Replit mobile
- **Liquidity Needed:** None
