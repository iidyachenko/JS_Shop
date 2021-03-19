const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        basket_products: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        searchLine: '',
        showCart: false,
        filtered: [],
        isVisibleCart: false,
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        FilterGoods() {
            console.log(this.searchLine);
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            console.log(this.filtered);
            this.products.forEach(el => {
                const block = document.querySelector(`.${el.product_name}`);
                console.log(block);
                console.log(el.product_name);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },

        addProduct(item) {
            this.getJson(`${API}/addToBaske.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.basket_products.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.basket_products.push(prod)
                        }
                    }
                })
                .catch(
                    console.log("Erorr!!!")
                )
        },

        removeProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        basket_item = this.basket_products.find(item => item.id_product === product.id_product)
                        basket_item.quantity--;
                        if (basket_item.quantity <= 0) {
                            let index = this.basket_products.indexOf(basket_item);
                            if (basket_item !== -1) this.basket_products.splice(index, 1);
                        }
                    }
                })
        }


    },


    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket_products.push(el);
                }
                console.log(this.basket_products)
            });
    }
})

