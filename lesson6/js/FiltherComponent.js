Vue.component('search', {
    template: `
    <div class="search-form">
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model.lazy="$root.searchLine">
            <button class="btn-search" type="submit" @click="$root.FilterGoods()">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div> 
    `
});