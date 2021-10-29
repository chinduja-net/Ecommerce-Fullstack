//!Slider dots
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.dots');
    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();

//! Display products
const productDom = document.querySelector('.products');
async function displayAllProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const newProduct = document.createElement('div');
        newProduct.innerHTML = `<div class ="product">
         <img class="product__image" src="${data[i].image}">
          <h2 class="product__name">${data[i].name}</h2>
          <h3 class="product__price">${data[i].price}</h3>
          <button class="btn btn--add" data-action="ADD_TO_CART">ADD TO CART</button>
         </div>`;
        productDom.appendChild(newProduct);
    };
    addToCart(data);
    searchProduct(data);
};
displayAllProducts();

//!Add products to cart

function addToCart(data) {
    const addToCartButtons = document.querySelectorAll('[data-action="ADD_TO_CART"]');

    for (let i = 0; i < addToCartButtons.length; i++) {

        addToCartButtons[i].addEventListener('click', () => {

            addToCartButtons[i].disabled = 'true';
            fetch(`http://localhost:3000/api/cart/${data[i].id}`, {
                method: 'POST',
            });
            location.reload();
        })
    }
}

//! Display cart
const cartDOM = document.querySelector('.cart');

async function getCartProducts() {

    const response = await fetch('http://localhost:3000/api/cart');
    const product = await response.json();

    for (let i = 0; i < product.length; i++) {

        const newCart = document.createElement('div');
        newCart.innerHTML = `<div class="cart__item">
        <img class="cart__item__image" src="${product[i].image}" alt="${product[i].name}">
        <h3 class="cart__item__name">${product[i].name}</h3>
        <h3 class="cart__item__price">${product[i].price}</h3>
        <button class="btn btn--remove" data-action="REMOVE_ITEM">&times;</button>
        </div>`;
        cartDOM.appendChild(newCart);

    }
    removeCart(product);
}
getCartProducts();

//! Remove cart items 
function removeCart(product) {
    const deleteButtons = document.querySelectorAll('[data-action = "REMOVE_ITEM" ]');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            fetch(`http://localhost:3000/api/cart/${product[i].id}`, {
                method: 'DELETE',
            })
            
            location.reload();
        })
    }
}
//!search product
function searchProduct(data) {
    let searchBar = document.getElementById('searchbar');

    searchBar.addEventListener('keyup', () => {

        let searchString = searchBar.value;

        for (let i = 0; i < data.length; i++) {

            if (searchString.toUpperCase() === (data[i].name).toUpperCase()) {

                const response = fetch(`http://localhost:3000/api/products/${data[i].name}`)
                    .then(response => response.json())
                    .then(data => console.log(data))
                productDom.style.display = 'none';
                const newProduct = document.createElement('div');
                newProduct.innerHTML = `<div class ="product">
                    <img class="product__image" src="${data[i].image}">
                     <h2 class="product__name">${data[i].name}</h2>
                     <h3 class="product__price">${data[i].price}</h3>
                     <button class="btn btn--filter">ADD TO CART</button>
                     </div>`;
                document.querySelector('.filter').appendChild(newProduct);
                document.querySelector('.btn--filter').addEventListener('click', () => {

                    fetch(`http://localhost:3000/api/cart/${data[i].id}`, {
                        method: 'POST',
                    });
                    
                    location.reload();
                })


            }

        }
    })
}












