var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'These are comfortable yet supportive socks for running.',
        image: '../assets/vmSocks-green-onWhite.jpg',
        link: 'https://amazon.com',
        altText: "A fuzzy pair of socks.",
        inStock: true,
        inventory: 10,
        onSale: true
    }
})