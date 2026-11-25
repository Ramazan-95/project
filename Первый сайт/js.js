
const products = [
    {
        id: 1,
        name: "iPhone 17 Pro",
        description: "256 GB · Cosmic Orange",
        price: 1299,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600"
    },
    {
        id: 2,
        name: "MacBook Pro",
        description: "M4 · 16 GB RAM · 512 GB",
        price: 1999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"
    },
    {
        id: 3,
        name: "iPad Pro",
        description: "11 inch · Wi-Fi · 256 GB",
        price: 1099,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"
    },
    {
        id: 4,
        name: "Apple Watch",
        description: "Series 11 · GPS",
        price: 449,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600"
    }
];

let cart = [];

function renderProducts() {
    const container = document.getElementById("products");

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${product.price} €</div>
            <button class="add-btn" onclick="addToCart(${product.id})">
                В корзину
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;
    document.getElementById("total").textContent = total;

    document.getElementById("cart-items").innerHTML =
        cart.length ? cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.price} € × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join("") : "<p>Корзина пока пуста.</p>";
}

function toggleCart() {
    const cartWindow = document.getElementById("cart");

    cartWindow.style.display =
        cartWindow.style.display === "flex" ? "none" : "flex";
}

function checkout() {
    if (cart.length === 0) {
        alert("Сначала добавьте товары в корзину!");
        return;
    }

    alert("Спасибо за заказ! Это демонстрационный магазин. Для реальных заказов необходимо подключить сервер.");

    cart = [];
    updateCart();
    toggleCart();
}

renderProducts();
updateCart();
