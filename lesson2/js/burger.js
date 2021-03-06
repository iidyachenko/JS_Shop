
class Burger {
    constructor(size_list, garnir_list, add_list) {
        for (let item of size_list) {
            if (item.checked) {
                this.size = item.id;
            }
        }
        for (let item of garnir_list) {
            if (item.checked) {
                this.garnir = item.id;
            };
        }

        this.souse_list = [];

        for (let item of add_list) {
            if (item.checked) {
                this.souse_list.push(item.id);
            };
        }

        this.price_list = [
            { id: "little", price: 50, kal: 20 },
            { id: "big", price: 100, kal: 40 },
            { id: "cheese", price: 10, kal: 20 },
            { id: "salat", price: 20, kal: 5 },
            { id: "potato", price: 15, kal: 10 },
            { id: "sauce", price: 15, kal: 0 },
            { id: "Mayonnaise", price: 20, kal: 5 },
        ];
    }

    burger_sum() {
        let s_price = 0;
        let s_kal = 0;
        for (let item of this.price_list) {
            if (item.id == this.size || item.id == this.garnir || this.souse_list.indexOf(item.id) != -1) {
                s_price += item.price;
                s_kal += item.kal;
            };
        }

        const block = document.querySelector('.container');
        console.log(block);
        block.innerHTML = `<div class="product_sum"> Стоимость бургера: ${s_price}</div>
        <div class="product_sum"> Калорий в бургере: ${s_kal}</div>`;
    };


}
let size_list = deserts = document.getElementsByName('r1')
let garnir_list = document.getElementsByName('r2')
let add_list = document.getElementsByName('c1')
let price_list = { id: 1, title: 'Notebook', price: 2000 }

function fanc() {
    let burger = new Burger(size_list, garnir_list, add_list);
    console.dir(burger);
    burger.burger_sum();
}