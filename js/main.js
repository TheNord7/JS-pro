'use strict'


class ProductList {
  constructor(container = '.products') {
    this._container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this._goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }

  _render() {
    for (const product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      this._container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  //Суммарная стоимость товаров в корзине
  calcPrice() {
    let totalPrice = document.querySelector('.total-cart');
    let sum = 0;
    this._goods.forEach(good => {
      sum += good.price
    });
    totalPrice.insertAdjacentHTML('beforeend', `Итого: ${sum}`);
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
            <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="buy-btn">Купить</button>
            </div>
        </div>`;
  }
}

// class ShoppingCart {
//   constructor() {
//     this._goods = [];
//     this._allProducts = [];
//   }

//   addToCart() {
//     this._goods.push();   метод должен добавлять товар из списка в корзину
//   }

//   removeFromCart() { метод должени удалять то что было добавлено

//   }


// }



new ProductList();


// const products = [
//   { id: 1, title: 'Notebook', price: 1000 },
//   { id: 2, title: 'Mouse', price: 100 },
//   { id: 3, title: 'Keyboard', price: 250 },
//   { id: 4, title: 'Gamepad', price: 150 },
// ];

// const renderProduct = (title = 'наименование', price = 'цена') => {
//   return `<div class="product-item">
//             <h3>${title}</h3>
//             <p>${price}</p>
//             <button class="by-btn">Добавить</button>
//           </div>`;
// };

// let productsEl = document.querySelector('.products');

// const renderProducts = list => {
//   productsEl.innerHTML = list.map(item => renderProduct(item.title, item.price)).join("");
// };

// renderProducts(products);
