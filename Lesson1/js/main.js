const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/product.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/product.jpg' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/product.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/product.jpg' },
];
//Функция для формирования верстки каждого товара
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.img}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);