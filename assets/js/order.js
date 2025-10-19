// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderItems = document.getElementById("order-items");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

function renderOrderSummary() {
  orderItems.innerHTML = "";

  if (cart.length === 0) {
    orderItems.innerHTML = `<p>Your cart is empty. <a href="menu.html">Browse Menu</a></p>`;
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    // Calculate price (same logic as before)
    let price = parseFloat(item.price.replace("$", ""));
    if (item.size === "Medium (+20%)") price *= 1.2;
    if (item.size === "Large (+40%)") price *= 1.4;
    if (item.addons?.caramel) price += 0.5;
    if (item.addons?.vanilla) price += 0.5;
    if (item.addons?.whipped) price += 0.75;

    const itemTotal = price * (item.quantity || 1);
    subtotal += itemTotal;

    const addons = Object.keys(item.addons || {})
      .filter((key) => item.addons[key])
      .join(", ");

    const div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Size: ${item.size || "Regular"}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Sweetness: ${item.sweetness || 50}%</p>
      ${addons ? `<p>Add-ons: ${addons}</p>` : ""}
      <p><strong>$${itemTotal.toFixed(2)}</strong></p>
    `;
    orderItems.appendChild(div);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

renderOrderSummary();

// Handle form submit
document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Order placed successfully! We'll prepare it for pickup.");
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html"; // or redirect anywhere
});
