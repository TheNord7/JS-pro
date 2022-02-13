const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title = 'наименование', price = 'цена') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;
};

let productsEl = document.querySelector('.products');

const renderProducts = list => {
  productsEl.innerHTML = list.map(item => renderProduct(item.title, item.price)).join("");
};

renderProducts(products);
