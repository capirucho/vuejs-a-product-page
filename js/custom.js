Vue.component('product', {
    props: {
      premium: {
          type: Boolean,
          required: true
      }
    },
    template: `
            <div class="product">
                <div class="flex-container">
                    <div class="cart">
                        <p>Cart({{ cart }})</p>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="product-image">
                        <img :src="image" :alt="altText" />
                    </div>

                    <div class="product-info">
                        <h1>{{ title }}</h1>
                        <span class="membership-status" v-if="premium">You are a premium member: {{ shipping }}</span>
                        <span class="membership-status" v-else="!premium">You are not a premium member: {{ shipping }}</span>
                        <span class="onSale">{{ sale }}</span>
                        <p>{{ description }}</p>
                        <p v-if="inStock > 10">In Stock</p>
                        <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
                        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
    
                        <ul >
                            <li v-for="detail in details">{{ detail }}</li>
                        </ul>
    
                        <h3>Choose your color:</h3>
                        <ul class="color-list">
                            <li @mouseover="updateProductImage(index) " v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :class="variant.variantColor">
                                {{ variant.variantColor }}
                            </li>
                        </ul>
                        <h3>Choose your size:</h3>
                        <select class="sizes-list" list="sizes" placeholder="choose your size">
                            <option selected value="">-- sizes -- </option>
                            <option id="sizes" v-for="size in sizes" :key="size.sizeId" :value="size.sizeId">{{ size.size }}</option>
                        </select>
    
    
                        <button class="add-to-cart-button"
                                v-on:click="addToCart"
                                :disabled="!inStock"
                                :class="{ disabledButton: !inStock }">add to cart</button>
                        <span class="remove-item" v-on:click="removeFromCart">remove item</span>
                    </div>
                </div>
            </div>
    `,
    data: function () {
        return {
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
        }
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

        },
        shipping: function () {
            if (this.premium) {
                return "Shipping is Free"
            }
            return 2.99
        }
    }

});



var app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})