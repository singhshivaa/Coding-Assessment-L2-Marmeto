let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        allProducts = data.categories;
        filterProducts('Men'); 
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

function displayProducts(categories) {
    const container = document.querySelector('.product-cards');
    container.innerHTML = ''; 

    categories.forEach(category => {
        const products = category.category_products;

        products.forEach((product) => {
            createProductCard(product, container);
        });
    });


    document.querySelector('.product-cards-outer').style.opacity = '1';
}

function createProductCard(product, container) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.image;
    card.appendChild(img);

    const title = document.createElement('h2');
    title.innerText = product.title;
    card.appendChild(title);

    const vendor = document.createElement('p');
    vendor.innerText = `Vendor: ${product.vendor}`;
    card.appendChild(vendor);

    const price = document.createElement('p');
    price.innerText = `Price: ${product.price}`;
    card.appendChild(price);

    const compareAtPrice = document.createElement('p');
    compareAtPrice.innerText = `Compare at: ${product.compare_at_price}`;
    card.appendChild(compareAtPrice);

    const discount = document.createElement('p');
    const discountPercentage = ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(2);
    discount.innerText = `${discountPercentage}% off`;
    card.appendChild(discount);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    card.appendChild(addToCartBtn);

   
    card.style.opacity = '1';

    container.appendChild(card);
}

function filterProducts(categoryName) {
    const filteredCategories = allProducts.filter(category => category.category_name === categoryName);
    displayProducts(filteredCategories);
    setActiveButton(categoryName);
}

function setActiveButton(categoryName) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        if (button.textContent.includes(categoryName)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

fetchProducts();
