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
    img: "../images/image-product-1-thumbnail.jpg",
    price: 125.0,
    quantity: 0,
};

const cart = [];

const addToCart = () => {
    cartContent.classList.remove("empty");
    cartContent.classList.add("filled");
    cartContent.innerHTML = "";

    const ul = document.createElement("ul");
    ul.className = "header__cart--list";

    const checkoutButton = document.createElement("button");
    checkoutButton.className = "header__cart--checkout";
    checkoutButton.setAttribute("id", "checkout-button");
    checkoutButton.innerText = "Checkout";

    ul.innerHTML = cart
        .map((item) => {
            return `
                <li class="header__cart--item">
                    <img
                        class="header__cart--item-img"
                        src=${item.img}
                        alt=""
                    />
                    <div class="header__cart--item-description">
                        ${item.name}
                        <span class="header__cart--item-description-price">
                            ${Number(item.price)} x ${item.quantity}
                            <span class="header__cart--item-description-total">
                                $${item.price * item.quantity}
                            </span>
                        </span>
                    </div>
                    <button
                        id=${item.id}
                        class="header__cart--item-delete"
                    >
                        <img
                            src="./images/icon-delete.svg"
                            alt=""
                        />
                    </button>
                </li>`;
        })
        .join("");

    cartContent.appendChild(ul);
    cartContent.appendChild(checkoutButton);
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
    if (!cartModal.classList.contains("is-open")) {
        cartModal.classList.add("is-open");
    } else {
        cartModal.classList.remove("is-open");
    }
};

const addOrUpdateCart = () => {
    const [itemExist] = cart.filter((cartItem) => cartItem.id === product.id);
    if (itemExist) {
        cart.filter((cartItem) => cartItem.id === product.id).map(
            (item) => (item.quantity = item.quantity + quantity)
        );
        console.log(cart);
    } else {
        cart.push(product);
    }
    addToCart();
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
        addOrUpdateCart();
    }
    quantity = 0;
    quantitySpan.textContent = quantity;
});

// window.addEventListener("click", (e) => {
//     if (!cartModal.contains(e.target)) {
//     }
// });

window.addEventListener("resize", () => {
    if (this.innerWidth >= 1100) {
        hideSidebar();
    }
});
