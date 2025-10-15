// shadowdex demo script (simulated encryption + Arcium private match)
const ordersEl = document.getElementById('orders');
const eventsEl = document.getElementById('events');
const matchResultEl = document.getElementById('matchResult');
const submitBtn = document.getElementById('submitBtn');
const matchBtn = document.getElementById('matchBtn');

let orders = [];

// Simple "fake encryption" that hides actual data but keeps a short id
function fakeEncryptOrder(order) {
  // In real flow: Arcium SDK encrypts this payload client-side
  // We simulate by hashing the JSON and returning a base64-like stub
  const s = JSON.stringify(order);
  let hash = 0;
  for (let i=0;i<s.length;i++) hash = ((hash<<5)-hash) + s.charCodeAt(i);
  return btoa(String(Math.abs(hash))).slice(0,10);
}

function renderOrders() {
  if (orders.length === 0) {
    ordersEl.innerHTML = '<i class="muted">No encrypted orders yet.</i>';
    return;
  }
  ordersEl.innerHTML = orders.map(o => {
    return `<div style="padding:6px;border-bottom:1px dashed rgba(255,255,255,0.02)">
      <b>${o.trader}</b> — <span style="opacity:0.8">encrypted id</span>: <code>${o.encryptedId}</code>
    </div>`;
  }).join('');
}

function renderEvents() {
  if (!eventsEl) return;
  if (eventsEl.children.length === 0) eventsEl.innerHTML = '<i class="muted">No events yet.</i>';
}

submitBtn.onclick = function() {
  const trader = document.getElementById('trader').value || 'anon';
  const side = document.getElementById('side').value;
  const price = parseFloat(document.getElementById('price').value || '0');
  const amount = parseFloat(document.getElementById('amount').value || '0');

  const order = { trader, side, price, amount, ts: Date.now() };
  const encryptedId = fakeEncryptOrder(order);

  // store only encrypted id publicly (simulate privacy)
  orders.push({ trader, encryptedId, ts: order.ts, _raw: order });
  renderOrders();

  // small feedback
  matchResultEl.innerHTML = `<div style="color:#c7f9d4">Order submitted (encrypted) — id ${encryptedId}</div>`;
};

matchBtn.onclick = function() {
  matchResultEl.innerHTML = 'Running private match (simulated Arcium MPC)...';
  // Simulate delay of private MPC
  setTimeout(() => {
    // For demo: try to find a buy and sell that overlap
    let match = null;
    for (let i=0;i<orders.length;i++){
      for (let j=i+1;j<orders.length;j++){
        const a = orders[i]._raw;
        const b = orders[j]._raw;
        if (a.side !== b.side) {
          // compute match rule: buy price >= sell price -> match
          let buy = a.side === 'buy' ? a : b;
          let sell = a.side === 'sell' ? a : b;
          if (buy.price >= sell.price && buy.amount > 0 && sell.amount > 0) {
            const execPrice = ((buy.price + sell.price)/2).toFixed(2);
            match = { buyTrader: buy.trader, sellTrader: sell.trader, price: execPrice, amount: Math.min(buy.amount, sell.amount) };
            break;
          }
        }
      }
      if (match) break;
    }

    if (match) {
      // Emit simulated on-chain event
      const ev = `Matched: ${match.buyTrader} ↔ ${match.sellTrader} @ ${match.price} (amt ${match.amount})`;
      const evEl = document.createElement('div');
      evEl.textContent = ev;
      eventsEl.prepend(evEl);
      matchResultEl.innerHTML = `<div style="color:#c7f9d4">Private match found — ${ev}</div>`;
    } else {
      matchResultEl.innerHTML = `<div style="color:#ffd7d7">No private match found.</div>`;
    }
  }, 1500);
};

// initial render
renderOrders();
renderEvents();
