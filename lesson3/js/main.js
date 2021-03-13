const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов       
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                const block = document.querySelector(this.container);
                for (let product of this.goods) {
                    const productObj = new ProductItem(product);
                    this.allProducts.push(productObj);
                    block.insertAdjacentHTML('beforeend', productObj.render());
                }
            });
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class BasketList extends ProductsList {
    constructor(container = '.basket') {
        super(container);
        this._getProducts()
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }



    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = ''
        this.allProducts = []
        for (let product of this.goods) {
            const productObj = new BasketItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

        function removeButtonClickHandler(event) {
            basket.remove_roduct(event);
        }

        let remove_buttons = document.querySelectorAll(".remove_btn");
        for (let button of remove_buttons) {
            button.addEventListener('click', removeButtonClickHandler);
        }

        function addButtonClickHandler(event) {
            basket.add_product(event);
        }

        let add_buttons = document.querySelectorAll(".add_btn");
        for (let button of add_buttons) {
            button.addEventListener('click', addButtonClickHandler);
        }
    }


    add_product(event) {
        fetch(`${API}/addToBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
            .then(data => {
                let index = 0;
                for (let product of this.goods) {
                    if (product.id_product == event.target.id) {
                        index = this.goods.indexOf(product);
                        this.goods[index].quantity += data.result;
                    }
                }
                this.render()
            }
            )
    }


    remove_roduct(event) {
        fetch(`${API}/deleteFromBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
            .then(data => {
                let index = 0;
                for (let product of this.goods) {
                    if (product.id_product == event.target.id) {
                        index = this.goods.indexOf(product);
                        if (this.goods[index].quantity > 0) {
                            this.goods[index].quantity -= data.result;
                        }

                    }
                }
                this.render()
            }
            )
    }

}

class BasketItem extends ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        super(product, img);
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    Количество:<div class="count">${this.quantity}</div>
                    <button class="add_btn" id=${this.id}>+</button><button class="remove_btn" id=${this.id}>-</button>
                </div>
            </div>`
    }
}


let list = new ProductsList();
list.render();

let basket = new BasketList();
basket.render();
