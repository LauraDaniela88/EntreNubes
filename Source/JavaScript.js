// ==========================================
// ENTRE NUBES - JAVASCRIPT
// ==========================================


// ==========================================
// CARRITO
// ==========================================

let cart = [];

const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


// Abrir carrito

cartButton.addEventListener("click", () => {

    cartOverlay.classList.add("active");

});


// Cerrar carrito

closeCart.addEventListener("click", () => {

    cartOverlay.classList.remove("active");

});


// Cerrar haciendo clic fuera del carrito

cartOverlay.addEventListener("click", (event) => {

    if (event.target === cartOverlay) {

        cartOverlay.classList.remove("active");

    }

});


// ==========================================
// AGREGAR PRODUCTOS
// ==========================================

const addButtons =
    document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        const existingProduct =
            cart.find(product => product.name === name);


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();


        // Abrir carrito automáticamente

        cartOverlay.classList.add("active");

    });

});


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

    }


    let total = 0;

    let quantity = 0;


    cart.forEach((product, index) => {

        total +=
            product.price * product.quantity;

        quantity +=
            product.quantity;


        const item =
            document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    $${formatPrice(product.price)}
                </p>

                <small>
                    Cantidad: ${product.quantity}
                </small>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        "$" + formatPrice(total);


    // Botones eliminar

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ==========================================
// FORMATO DE PRECIO
// ==========================================

function formatPrice(number) {

    return number.toLocaleString("es-CO");

}


// ==========================================
// FILTROS DE PRODUCTOS
// ==========================================

const filters =
    document.querySelectorAll(".filter");

const products =
    document.querySelectorAll(".product");


filters.forEach(filter => {

    filter.addEventListener("click", () => {


        filters.forEach(item => {

            item.classList.remove("active");

        });


        filter.classList.add("active");


        const category =
            filter.dataset.category;


        products.forEach(product => {

            if (
                category === "todos" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


// ==========================================
// ANIMACIÓN DE PRODUCTOS
// ==========================================

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


products.forEach(product => {

    observer.observe(product);

});


// ==========================================
// BUSCADOR
// ==========================================

const searchButton =
    document.getElementById("searchButton");

const searchContainer =
    document.getElementById("searchContainer");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


// Abrir buscador

searchButton.addEventListener("click", () => {

    searchContainer.classList.toggle("active");

    searchInput.focus();

});


// Cerrar buscador

closeSearch.addEventListener("click", () => {

    searchContainer.classList.remove("active");

    searchInput.value = "";

    products.forEach(product => {

        product.style.display = "block";

    });

});


// Buscar productos

searchInput.addEventListener("input", () => {

    const text =
        searchInput.value.toLowerCase();


    products.forEach(product => {

        const name =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();


        if (name.includes(text)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


// ==========================================
// NEWSLETTER
// ==========================================

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();


    const email =
        newsletterForm.querySelector("input").value;


    alert(
        `☁️ ¡Gracias por suscribirte!\n\nTe enviaremos nuestras novedades a ${email}.`
    );


    newsletterForm.reset();

});


// ==========================================
// FINALIZAR COMPRA
// ==========================================

const checkout =
    document.getElementById("checkout");


checkout.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    alert(
        "☁️ Gracias por tu compra en Entre Nubes.\n\nAquí posteriormente podemos conectar un sistema de pago."
    );

});


// ==========================================
// MENÚ - CERRAR CARRITO AL NAVEGAR
// ==========================================

const navLinks =
    document.querySelectorAll("nav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        cartOverlay.classList.remove("active");

    });

});