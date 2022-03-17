

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
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


  },

});
