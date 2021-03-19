


Vue.component('cart', {
    props: ['img', 'visibility'],
    template: `
    <div class="cart-block" v-show="visibility">
        <cartItem v-for="item of $parent.basket_products" :key="item.id_product" :img="img" :cartItem="item"></cartItem>
    </div> 
    `
})

Vue.component('cartItem', {
    props: ['img', 'cartItem'],
    template: `
            <div class=".cart-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{cartItem.product_name}}</h3>
                    <p>Цена за ед.: {{cartItem.price}} $</p>
                    <p>Количество: {{cartItem.quantity}} штук</p>
                    <p>Стоимость: {{cartItem.quantity*cartItem.price}} штук</p>
                    <button class="buy-btn" @click="$root.removeProduct(cartItem)">Удалить</button>
                </div>
            </div>   
    `
})


