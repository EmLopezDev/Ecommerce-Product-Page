const cartCheckoutButton = document.getElementById("cart-checkout");
const cartQuantitySpan = document.getElementById("cart-quantity");
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
const productImage = document.getElementById("product-image");
const nextImageButton = document.getElementById("next-image");
const previousImageButton = document.getElementById("previous-image");
const imageButtons = document.querySelectorAll(
    ".product__lightbox--additional-thumbnail"
);

let quantity = 0;

let productCopyId = 1;

let currentImage = 1;

const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    img: "./images/image-product-1-thumbnail.jpg",
    price: 125.0,
    quantity: 0,
};

const cart = [];

const cartQuantity = () => {
    if (!cart.length) {
        cartCheckoutButton.classList.remove("filled");
        cartQuantitySpan.innerText = "";
    } else {
        cartCheckoutButton.classList.add("filled");
        const totalQuantity = cart.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
        cartQuantitySpan.innerText = totalQuantity;
    }
};

const emptyCart = () => {
    cartContent.classList.remove("filled");
    cartContent.classList.add("empty");
    cartContent.innerText = "Your cart is empty";
};

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
                            $${Number(item.price).toFixed(2)} x ${item.quantity}
                            <span class="header__cart--item-description-total">
                                $${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </span>
                    </div>
                    <button
                        id=${item.id}
                        class="header__cart--item-delete"
                        aria-label="delete button"
                        type="button"
                    >
                        <img
                            src="./images/icon-delete.svg"
                            alt=""
                        />
                    </>
                </li>`;
        })
        .join("");
    cartContent.appendChild(ul);
    cartContent.appendChild(checkoutButton);

    const deleteButton = document.querySelectorAll(
        ".header__cart--item-delete"
    );
    deleteButton.forEach((button) =>
        button.addEventListener("click", deleteItem)
    );
};

const deleteItem = (e) => {
    const id = e.currentTarget.id;
    const [index] = cart.reduce((acc, item, idx) => {
        if (Number(item.id) === Number(id)) {
            acc.push(idx);
        }
        return acc;
    }, []);

    cart.splice(index, 1);
    if (!cart.length) {
        emptyCart();
    } else {
        addToCart();
    }
    cartQuantity();
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

const changeSelectedImage = () => {
    imageButtons.forEach((button) => {
        parseInt(button.value) == currentImage
            ? button.classList.add("selected")
            : button.classList.remove("selected");
    });
};

const changeImageButton = (evt) => {
    if (currentImage !== evt.currentTarget.value) {
        currentImage = evt.currentTarget.value;
        productImage.style.backgroundImage = `url('./images/image-product-${currentImage}.jpg')`;
        productImage.style.backgroundPosition = `${
            currentImage === 1 ? "center" : "top"
        }`;
        changeSelectedImage();
    }
};

const changeImageSlide = (evt) => {
    if (evt.currentTarget.id === "previous-image" && currentImage > 1) {
        currentImage--;
        productImage.style.backgroundImage = `url('./images/image-product-${currentImage}.jpg')`;
    }

    if (evt.currentTarget.id === "next-image" && currentImage < 4) {
        currentImage++;
        productImage.style.backgroundImage = `url('./images/image-product-${currentImage}.jpg')`;
    }
    productImage.style.backgroundPosition = `${
        currentImage === 1 ? "center 60%" : "top"
    }`;
    changeSelectedImage();
};

hamburger.addEventListener("click", showSidebar);

closeButton.addEventListener("click", hideSidebar);

cartCheckoutButton.addEventListener("click", hideShowCart);

nextImageButton.addEventListener("click", changeImageSlide);

previousImageButton.addEventListener("click", changeImageSlide);

imageButtons.forEach((button) =>
    button.addEventListener("click", changeImageButton)
);

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
        const productCopy = { ...product };
        productCopy.quantity = quantity;
        productCopy.id = productCopyId;
        cart.push(productCopy);
        productCopyId++;
        addToCart();
    }
    cartQuantity();
    quantity = 0;
    quantitySpan.textContent = quantity;
});

window.addEventListener("resize", () => {
    if (this.innerWidth >= 1100) {
        hideSidebar();
    }
});
