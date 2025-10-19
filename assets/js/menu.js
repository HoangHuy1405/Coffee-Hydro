const drinks = [
  {
    name: "Classic Latte",
    price: "$4.50",
    description: "Espresso with steamed milk and a light foam",
    image: "./assets/images/coffee1.jpg",
    alt: "Classic latte with beautiful foam art",
  },
  {
    name: "Espresso",
    price: "$3.00",
    description: "Rich, bold espresso shot",
    image: "./assets/images/coffee2.jpg",
    alt: "Rich espresso in a white cup",
  },
  {
    name: "Cappuccino",
    price: "$4.75",
    description: "Espresso with steamed milk and thick foam",
    image: "./assets/images/coffee3.jpg",
    alt: "Cappuccino with thick creamy foam",
  },
  {
    name: "Iced Coffee",
    price: "$4.00",
    description: "Cold brewed coffee over ice",
    image: "./assets/images/coffee4.jpg",
    alt: "Refreshing iced coffee",
  },
];

const pastries = [
  {
    name: "Butter Croissant",
    price: "$3.50",
    description: "Flaky, buttery French pastry",
    image: "./assets/images/beans.jpg",
    alt: "Fresh butter croissant",
  },
  {
    name: "Chocolate Cake",
    price: "$4.50",
    description: "Rich chocolate layer cake",
    image: "./assets/images/treat.jpg",
    alt: "Decadent chocolate cake slice",
  },
  {
    name: "Blueberry Muffin",
    price: "$3.25",
    description: "Homemade with fresh blueberries",
    image: "./assets/images/beans.jpg",
    alt: "Fresh blueberry muffin",
  },
];

// populate data dynamically (card)
function createMenuCard(item) {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.innerHTML = `
    <div class="menu-image">
      <img src="${item.image}" alt="${item.alt}">
    </div>
    <div class="menu-info">
      <div class="menu-title">
        <h3>${item.name}</h3>
        <span class="menu-price">${item.price}</span>
      </div>
      <p class="menu-desc">${item.description}</p>
      <button class="menu-btn" 
      onclick="addToCart('${item.name}', '${item.price}', '${item.image}')">Add to Cart</button>
    </div>
  `;
  return card;
}

function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);
  items.forEach((item) => container.appendChild(createMenuCard(item)));
}

renderMenu(drinks, "drinks-container");
renderMenu(pastries, "pastries-container");

// using local storage to store
function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    alert(`${name} already in cart!`);
  } else {
    const defaultSize = "Small";
    const defaultSweetness = 50;

    cart.push({
      name,
      price,
      image,
      quantity: 1,
      size: defaultSize,
      sweetness: defaultSweetness,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  }
}
