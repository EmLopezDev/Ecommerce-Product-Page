const cartCheckoutButton = document.getElementById("cart-checkout");
const cartModal = document.getElementById("cart-modal");
const cartContent = document.getElementById("cart-content");
const hamburger = document.getElementById("hamburger");
const closeButton = document.getElementById("close");
const sidebarContainer = document.getElementById("sidebar-container");
const sidebar = document.getElementById("sidebar");
const quantitySpan = document.getElementById("quantity");
const quantityMinus = document.getElementById("quantity-minus");
const quantityPlus = document.getElementById("quantity-plus");
const addToCartButton = document.getElementById("add-cart");

let quantity = 0;

const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125.0,
    quantity: 0,
};

const cart = [product];

const showCartContent = () => {
    if (!cart.length) {
        cartContent.classList.add("empty");
        cartContent.innerText = "Your cart is empty.";
    } else {
        cart.map(item);
    }
};

const showSidebar = () => {
    sidebarContainer.style.display = "block";
    setTimeout(() => {
        sidebar.classList.add("is-open");
    }, 0);
};

const hideSidebar = () => {
    sidebar.classList.remove("is-open");
    setTimeout(() => {
        sidebarContainer.style.display = "none";
    }, 200);
};

const hideShowCart = () => {
    cartModal.classList.toggle("is-open");
    showCartContent();
};

hamburger.addEventListener("click", showSidebar);

closeButton.addEventListener("click", hideSidebar);

cartCheckoutButton.addEventListener("click", hideShowCart);

sidebarContainer.addEventListener("click", (e) => {
    if (e.target.id === "sidebar-container") {
        hideSidebar();
    }
});

quantityMinus.addEventListener("click", () => {
    if (quantity <= 0) {
        quantity = 0;
        quantitySpan.textContent = quantity;
    } else {
        quantity--;
        quantitySpan.textContent = quantity;
    }
});

quantityPlus.addEventListener("click", () => {
    quantity++;
    quantitySpan.textContent = quantity;
});

addToCartButton.addEventListener("click", () => {
    if (quantity > 0) {
        product.quantity = quantity;
        cart.push(product);
    }
    quantity = 0;
    quantitySpan.textContent = quantity;
});

window.addEventListener("resize", () => {
    if (this.innerWidth >= 1100) {
        hideSidebar();
    }
});
{
    /* <>
    <ul class="header__cart--list">
        <li class="header__cart--item">
            <img
                class="header__cart--item-img"
                src="./images/image-product-1-thumbnail.jpg"
                alt=""
            />
            <div class="header__cart--item-description">
                Fall Limited Edition Sneakers
                <span class="header__cart--item-description-price">
                    $125.00 x 3
                    <span class="header__cart--item-description-total">
                        $375.00
                    </span>
                </span>
            </div>
            <button class="header__cart--item-delete">
                <img
                    src="./images/icon-delete.svg"
                    alt=""
                />
            </button>
        </li>
    </ul>
    <button class="header__cart--checkout">Checkout</button>
</>; */
}
