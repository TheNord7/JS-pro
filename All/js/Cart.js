Vue.component('cart', {
    data() {
        return {
            cartUrl: '',
            cart: [], //товары корзины
            img: 'https://via.placeholder.com/200x150',
            showCart: false,
        }
    },

    methods: {
        addProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if (find) {
                this.$root.putData(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$root.postData('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cart.push(prod);
                        }
                    });
            }
        },


        deleteProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            this.$root.postData('/api/cart')
                .then(data => {
                    if (data.result === 1) {
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(find), 1);
                        }
                    }
                });
        },
    },

    template:
        `<div>
        <button class="btn-cart" type="button" v-on:click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cart.length">Корзина пуста</p>
            <cart-list v-for="cartItem of cart" :key="cartItem.id_product" v-show="showCart" :cart-item="cartItem" imgCart="img" @deleteProduct="deleteProduct"></cart-list>
        </div>
        </div>`
});

Vue.component('cart-list', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div>
                        <img :src="img" alt="img">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('deleteProduct', cartItem)">&times;</button>
                    </div>
                </div>
    `
});