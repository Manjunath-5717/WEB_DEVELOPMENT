
// ================= GET HTML ELEMENTS =================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const searchMessage =
    document.getElementById("searchMessage");

const addCartButtons =
    document.querySelectorAll(".add-cart");

const productCards =
    document.querySelectorAll(".product-card");

const accountBtn =
    document.getElementById("accountBtn");

const ordersBtn =
    document.getElementById("ordersBtn");

const menuBtn =
    document.getElementById("menuBtn");

const shopNowBtn =
    document.getElementById("shopNowBtn");

const checkoutBtn =
    document.getElementById("checkoutBtn");


// ================= CART ARRAY =================

// This array stores the products selected by the user.

let cart = [];


// ================= ADD TO CART =================

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Find the product card containing the clicked button.

        const productCard =
            button.closest(".product-card");


        // Get product information from HTML.

        const productName =
            productCard.getAttribute("data-name");

        const productPrice =
            Number(productCard.getAttribute("data-price"));


        // Check if product already exists in cart.

        const existingProduct =
            cart.find(function(product) {
                return product.name === productName;
            });


        if (existingProduct) {

            // Increase quantity if product already exists.

            existingProduct.quantity++;

        } else {

            // Add a new product to the cart.

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }


        // Update cart display.

        updateCart();


        // Give feedback to the user.

        button.textContent = "Added";

        setTimeout(function() {

            button.textContent = "Add to Cart";

        }, 1000);

    });

});


// ================= UPDATE CART =================

function updateCart() {

    // Clear old cart content.

    cartItemsContainer.innerHTML = "";


    // If cart is empty.

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }


    let totalItems = 0;

    let totalPrice = 0;


    // Loop through every cart product.

    cart.forEach(function(product, index) {

        totalItems += product.quantity;

        totalPrice +=
            product.price * product.quantity;


        // Create cart item.

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <h3>${product.name}</h3>

            <p class="cart-item-price">
                ₹${product.price}
            </p>

            <div class="quantity">

                <button
                    class="decrease-btn"
                    data-index="${index}">
                    -
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    class="increase-btn"
                    data-index="${index}">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                data-index="${index}">
                Remove
            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    // Update cart count.

    cartCount.textContent = totalItems;


    // Update total price.

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");


    // Add events to quantity buttons.

    addQuantityEvents();

}


// ================= QUANTITY BUTTONS =================

function addQuantityEvents() {

    const increaseButtons =
        document.querySelectorAll(".increase-btn");

    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    // Increase quantity.

    increaseButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.getAttribute("data-index"));

            cart[index].quantity++;

            updateCart();

        });

    });


    // Decrease quantity.

    decreaseButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.getAttribute("data-index"));

            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }

            updateCart();

        });

    });


    // Remove product.

    removeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.getAttribute("data-index"));

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ================= OPEN CART =================

cartBtn.addEventListener("click", function() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

});


// ================= CLOSE CART =================

closeCart.addEventListener("click", function() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

});


cartOverlay.addEventListener("click", function() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

});


// ================= SEARCH =================

function searchProducts() {

    const searchText =
        searchInput.value.trim().toLowerCase();


    if (searchText === "") {

        searchMessage.textContent =
            "Please enter a product name.";

        productCards.forEach(function(card) {

            card.style.display = "block";

        });

        return;
    }


    let foundProduct = false;


    productCards.forEach(function(card) {

        const productName =
            card.getAttribute("data-name").toLowerCase();


        if (productName.includes(searchText)) {

            card.style.display = "block";

            foundProduct = true;

        } else {

            card.style.display = "none";

        }

    });


    if (foundProduct) {

        searchMessage.textContent =
            "Showing results for: " + searchText;

    } else {

        searchMessage.textContent =
            "No products found for: " + searchText;

    }

}


// Search button

searchBtn.addEventListener("click", searchProducts);


// Enter key search

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// ================= OTHER BUTTONS =================

accountBtn.addEventListener("click", function() {

    alert("Account section is available in the full version.");

});


ordersBtn.addEventListener("click", function() {

    alert("Your orders will appear here.");

});


menuBtn.addEventListener("click", function() {

    alert("Menu clicked.");

});


shopNowBtn.addEventListener("click", function() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

});


checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

    } else {

        alert("Checkout feature can be added in the next version.");

    }

});


// Initial cart display

updateCart();
