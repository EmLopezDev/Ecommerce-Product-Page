const cartCheckoutButton = document.getElementById("cart-checkout");
const cart = document.getElementById("cart");
const hamburger = document.getElementById("hamburger");
const closeButton = document.getElementById("close");
const sidebarContainer = document.getElementById("sidebar-container");
const sidebar = document.getElementById("sidebar");

cartCheckoutButton.addEventListener("click", () => {
    cart.classList.toggle("is-open");
});

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

hamburger.addEventListener("click", showSidebar);

closeButton.addEventListener("click", hideSidebar);

sidebarContainer.addEventListener("click", (e) => {
    if (e.target.id === "sidebar-container") {
        hideSidebar();
    }
});

window.addEventListener("resize", () => {
    if (this.innerWidth >= 1100) {
        hideSidebar();
    }
});
