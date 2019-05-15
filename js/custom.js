var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'These are comfortable yet supportive socks for running.',
        selectedVariant: 0,
        altText: "A fuzzy pair of socks.",
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 9
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
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

        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        removeFromCart: function () {
            if (this.cart !== 0) {
                this.cart -= 1
            } else {
                alert('there are 0 items in your cart');
            }

        },
        updateProductImage: function (index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale: function () {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ' + 'on sale!'
            } else {
                return this.brand + ' ' + this.product + ' ' + 'not on sale!'
            }

        }
    }
})