Vue.component('search', {
    data() {
        return {
            searchString: ''
        }
    },
    template:
        `<form class="lookfor" @submit.prevent="$parent.$refs.products.search(searchString)">
        <input type="text" class="search" v-model="searchString">
        <button class="search-btn" type="submit">O</button>
        </form>`
}); 