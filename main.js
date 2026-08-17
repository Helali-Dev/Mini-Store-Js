// Get Data From Fetch API
const productsList = document.querySelector(".products-list");
const loadingElement = document.querySelector(".loading-element");
const errorElement = document.querySelector(".error-element");
const searchText = document.querySelector(".search-text");
const sortPrice = document.querySelector(".sort-btn");
let loadMoreBtn = document.querySelector(".load-more-btn");
let modalContent = document.querySelector(".modal-content");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModal = document.querySelector(".close-modal");
let products = [];
let visibleShowProduct = 4;
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
  const sixProducts = data.slice(0, visibleShowProduct);
  sixProducts.forEach((item) => {
    const { title, image, price } = item;
    let productCard = `<li class="product-item">
          <img src="${image}" alt="${title}" class="product-img" />
          <h3 class="title-product">${shortenTitle(title)}</h3>

           <div class='product-details-box'>
               <button type='button' class='product-btn' data-id="${
                 item.id
               }">Buy</button>
               <p class="product-price">$ ${price}</p>
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

// Search Product
searchText.addEventListener("input", (e) => {
  const valueInput = e.target.value;
  const filterProduct = products.filter((item) => {
    return item.title.toLowerCase().includes(valueInput.toLowerCase());
  });
  showProducts(filterProduct);
});

// Sort Product
sortPrice.addEventListener("click", () => {
  const sortedPrice = [...products].sort((a, b) => b.price - a.price);
  showProducts(sortedPrice);
});

// Load More Product
loadMoreBtn.addEventListener("click", () => {
  visibleShowProduct += 4;
  showProducts(products);
});

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-btn")) {
    const productId = Number(e.target.dataset.id);

    const selectedProduct = products.find((item) => item.id == productId);
    modalContent.style.height = "500px";
    modalContent.style.opacity = "1";

    const showDetails = `
    <img class="img" src="${selectedProduct.image}" alt="" />
    <h2 class="title-product"> ${selectedProduct.title}</h2>
    <h3>price is ${selectedProduct.price} </h3>
    <button type="button" class="submit-shop">Submit</button>
    `;
    modalContent.innerHTML = showDetails;
    modalOverlay.classList.add("active");
  }
});

closeModal.addEventListener("click" , () => {
  modalOverlay.classList.remove("active");
})