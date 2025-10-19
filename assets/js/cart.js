const cartContainer = document.querySelector(".cart-items");
const totalElement = document.querySelector(".summary-row.total dd");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = ""; // Clear old content

  if (cart.length === 0) {
    cartContainer.innerHTML = `
        <div class="empty-cart">
          <div class="empty-icon">
            <i data-lucide="shopping-bag"></i>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some items from the menu to get started.</p>
          <a href="menu.html" class="btn outline">Browse Menu</a>
        </div>
      `;
    lucide.createIcons();
    updateSummary(0);
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const priceValue = parseFloat(item.price.replace("$", ""));
    const itemTotal = priceValue * (item.quantity || 1);
    subtotal += itemTotal;

    const article = document.createElement("article");
    article.className = "cart-item";
    article.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>

        <div class="item-details">
          <div class="item-header">
            <div>
              <h2 class="item-name">${item.name}</h2>
              <p class="item-price">$${itemTotal.toFixed(2)}</p>
            </div>
            <button type="button" class="remove-btn" aria-label="Remove item" onclick="removeItem(${index})">
              <i data-lucide="trash-2"></i>
            </button>
          </div>

          <div class="item-options">
            <div class="form-group">
              <label for="size-${index}">Size</label>
              <select id="size-${index}" name="size">
                <option>Small</option>
                <option>Medium (+20%)</option>
                <option>Large (+40%)</option>
              </select>
            </div>

            <div class="form-group quantity-group">
              <label for="quantity-${index}">Quantity</label>
              <input
                type="number"
                id="quantity-${index}"
                name="quantity"
                value="${item.quantity || 1}"
                min="1"
                step="1"
                class="quantity-input"
                onchange="updateQuantity(${index}, this.value)"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="sweetness-${index}">Sweetness Level:</label>
            <input type="range" id="sweetness-${index}" name="sweetness" min="0" max="100" step="10" value="50" />
          </div>

          <fieldset class="addons">
            <legend>Add-ons</legend>
            <label><input type="checkbox" name="caramel" /> Caramel (+$0.50)</label>
            <label><input type="checkbox" name="vanilla" /> Vanilla (+$0.50)</label>
            <label><input type="checkbox" name="whipped" /> Whipped Cream (+$0.75)</label>
          </fieldset>
        </div>
      `;
    cartContainer.appendChild(article);

    const sizeSelect = article.querySelector(`#size-${index}`);
    const sweetnessRange = article.querySelector(`#sweetness-${index}`);
    const addonInputs = article.querySelectorAll(
      ".addons input[type='checkbox']"
    );

    // Restore saved value
    if (item.size) sizeSelect.value = item.size;
    if (item.sweetness !== undefined) sweetnessRange.value = item.sweetness;
    addonInputs.forEach((addon) => {
      addon.checked = !!item.addons?.[addon.name];
    });

    // Listen for changes to save to local storage
    sizeSelect.addEventListener("change", (e) => {
      cart[index].size = e.target.value;
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    sweetnessRange.addEventListener("input", (e) => {
      cart[index].sweetness = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    addonInputs.forEach((addon) => {
      addon.addEventListener("change", (e) => {
        cart[index].addons = cart[index].addons || {};
        cart[index].addons[e.target.name] = e.target.checked;
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  });

  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const total = subtotal;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, value) {
  cart[index].quantity = parseInt(value);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function resetCartForm() {
  // Reset all form input fields visually
  const cartForm = document.getElementById("cart-form");
  cartForm.reset();

  // Reset inside localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    item.quantity = 1;
    item.size = "Small";
    item.sweetness = 50;
    item.addons = {
      caramel: false,
      vanilla: false,
      whipped: false,
    };
  });
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Form and cart fields have been reset!");
}

renderCart();
