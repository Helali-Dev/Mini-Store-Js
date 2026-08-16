// Get Data From Fetch API
const productsList = document.querySelector(".products-list");
const loadingElement = document.querySelector(".loading-element");
const errorElement = document.querySelector(".error-element");
const searchText = document.querySelector(".search-text");
let products = [];
const fetchProducts = () =>
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
      showProducts(data);
      products = data;
    })
    .catch((err) => {
      errorElement.textContent = err;
      hideLoading();
    });

fetchProducts();

// Show Product
function showProducts(data) {
  productsList.innerHTML = "";
  data.forEach((item) => {
    const { title, image, price } = item;
    let productCard = `<li class="product-item">
          <img src="${image}" alt="${title}" class="product-img" />
          <h3 class="title-product">${shortenTitle(title)}</h3>

           <div class='product-details-box'>
               <button type='button' class='product-btn'>Buy</button>
               <p class="product-p rice">$ ${price}</p>
           </div>
        </li>
    `;
    productsList.innerHTML += productCard;

    // Search To Produxt
  });
}

// Shorten Product Title
function shortenTitle(title) {
  return title.split(" ").slice(0, 3).join(" ");
}

// Hide Loading
const hideLoading = () => {
  loadingElement.style.display = "none";
};

searchText.addEventListener("input", (e) => {
  const valueInput = e.target.value;
  const filterProduct = products.filter((item) => {
    return item.title.toLowerCase().includes(valueInput.toLowerCase());
  });
  // return filterProduct;
  showProducts(filterProduct);
});
