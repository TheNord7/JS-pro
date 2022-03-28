Vue.component('products', {
    data() {
        return {
            productUrl: '',
            receivedProducts: [], //полученные товары по API
            img: 'https://via.placeholder.com/200x150',
            searchItems: [],
        }
    },

    methods: {
        search(val) {
            let regexp = new RegExp(val, 'igm');
            this.searchItems = this.receivedProducts.filter(el => regexp.test(el.product_name));
        }
    },

    mounted() {
        this.$parent.getData(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.receivedProducts.push(el); // создаемм массив товаров
                    this.searchItems.push(el); //массив товаров для поиска
                }
            });
    },

    template:
        `<div class="products">
            <product v-for="item of searchItems" :key="item.id_product" :product="item" imgItem="img"></product>
        </div>`
});

Vue.component('product', {
    props: ['product', 'imgItem'],

    template: `
    <div class="product-item">
                <img :src="imgItem" alt="img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});