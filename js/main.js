

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    productUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    receivedProducts: [], //полученные товары по API
    cart: [], //товары корзины
    img: 'https://via.placeholder.com/200x150',
    showCart: false, //переключатель
    searchItems: [],
    searchString: '', // значение введенное пользователем

  },
  methods: {
    getData(url) {
      return fetch(url ? url : `${API + this.url}`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(product) {
      this.getData(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cart.find(elem => elem.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let prod = Object.create(product);
              prod.quantity = 1;

              this.cart.push(prod);
            }
          } else {
            alert('Error');
          }
        })
    },

    deleteProduct(cartItem) {
      this.getData(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (cartItem.quantity > 1) {
              cartItem.quantity--;
            } else {
              this.cart.splice(this.cart.indexOf(cartItem), 1);
            }
          } else {
            alert('Error');
          }
        })
    },

    search() {
      let regexp = new RegExp(this.searchString, 'i', 'g', 'm'); // выражение по значению строки
      this.searchItems = this.receivedProducts.filter(elem => regexp.test(elem.product_name)); // создаем новый массив по регулярке
    },
  },

  mounted() {
    this.getData(`${API + this.productUrl}`)
      .then(data => {
        for (let el of data) {
          this.receivedProducts.push(el); // создаемм массив товаров
          this.searchItems.push(el); //массив товаров для поиска
        }
      });
  },
});

// let getRequest = (url) => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200) {
//           reject('Error');
//         } else {
//           resolve(xhr.responseText);
//         }
//       }
//     };
//     xhr.send();
//   })
// };

// class List {
//   constructor(url, container) {
//     this.container = container;
//     this._goods = [];
//     this.allProducts = [];
//     this.url = url;
//     this._init();
//   }

//   getData(url) {
//     return fetch(url ? url : `${API + this.url}`)
//       .then(result => result.json())
//       .catch(error => {
//         console.log(error);
//       })
//   }

//   handleData(data) {
//     this._goods = data;
//     this.render();
//   }

//   //Суммарная стоимость товаров в корзине
//   calcPrice() {
//     let totalPrice = document.querySelector('.total-cart');
//     let sum = 0;
//     this._goods.forEach(good => {
//       sum += good.price
//     });
//     totalPrice.insertAdjacentHTML('beforeend', `Итого: ${sum}`);
//   }

//   render() {
//     const block = document.querySelector(this.container);
//     for (let product of this._goods) {
//       let productObj = null;
//       if (this.constructor.name === 'ProductList') productObj = new ProductItem(product);
//       if (this.constructor.name === 'Cart') productObj = new CartItem(product);
//       if (!productObj) return;
//       this.allProducts.push(productObj);
//       block.insertAdjacentHTML('beforeend', productObj.render());
//     }

//   }

//   _init() {
//     return false
//   };

// };

// class Item {
//   constructor(elem, img = 'https://via.placeholder.com/200x150') {
//     this.id_product = elem.id_product;
//     this.product_name = elem.product_name;
//     this.price = elem.price;
//     this.img = img;
//   };

//   render() {
//     return ``;
//   };
// };



// class ProductList extends List {
//   constructor(cart, container = '.products', url = "/catalogData.json") {
//     super(url, container);
//     this.cart = cart;
//     this.getData()
//       .then(data => this.handleData(data));
//   }

//   _init() {
//     document.querySelector(this.container).addEventListener('click', elem => {
//       if (elem.target.classList.contains('buy-btn')) {
//         this.cart.addItem(elem.target);
//       }
//     });
//   }
// }

// class ProductItem extends Item {
//   render() {
//     return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price} ₽</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                 </div>
//             </div>`;
//   }
// }

// class Cart extends List {
//   constructor(container = '.cart-list', url = "/getBasket.json") {
//     super(url, container);

//     this.getData().then(data => this.handleData(data.contents));
//   }

//   addItem(elem) {
//     this.getData(`${API}/addToBasket.json`)
//       .then(data => {
//         if (data.result === 1) {
//           let productId = +elem.dataset['id'];
//           let find = this.allProducts.find(product => product.id_product === productId);
//           if (find) {
//             find.quantity++;
//             this.changeCart(find);
//           } else {
//             let product = {
//               id_product: productId,
//               price: +elem.dataset['price'],
//               product_name: elem.dataset['name'],
//               quantity: 1
//             };
//             this._goods = [product];
//             this.render();
//           }
//         } else {
//           alert('Error');
//         }
//       })
//   }

//   deleteProduct(element) {
//     this.getData(`${API}/deleteFromBasket.json`)
//       .then(data => {
//         if (data.result === 1) {
//           let productId = +element.dataset['id'];
//           let find = this.allProducts.find(product => product.id_product === productId);
//           if (find.quantity > 1) {
//             find.quantity--;
//             this.changeCart(find);
//           } else {
//             this.allProducts.splice(this.allProducts.indexOf(find), 1);
//             document.deleteSelector(`.cart-item[data-id="${productId}"]`).remove();
//           }
//         } else {
//           alert('Error');
//         }
//       })
//   }

//   _init() {
//     document.querySelector(this.container).addEventListener('click', elem => {
//       if (elem.target.classList.contains('del-btn')) {
//         this.deleteProduct(elem.target);
//       }
//     })
//   }

//   changeCart(product) {
//     let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//     block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
//     block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
//   }


// };

// class CartItem extends Item {
//   constructor(el, img = 'https://via.placeholder.com/150x100') {
//     super(el, img);
//     this.quantity = el.quantity;
//   }

//   render() {
//     return `<div class="cart-item" data-id="${this.id_product}">
//             <div class="product-bio">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Количество: ${this.quantity}</p>
//         <p class="product-single-price">${this.price} за ед.</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">${this.quantity * this.price} ₽</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//   }
// };


// let cart = new Cart();
// let products = new ProductList(cart);


