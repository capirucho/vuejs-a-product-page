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
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
        sizes: [
            {
                sizeId: "xs",
                size: "extra small"
            },
            {
                sizeId: "sm",
                size: "small"
            },
            {
                sizeId: "md",
                size: "medium"
            },
            {
                sizeId: "lg",
                size: "large"
            },
            {
                sizeId: "xl",
                size: "extra large"
            }

        ]
    }
})