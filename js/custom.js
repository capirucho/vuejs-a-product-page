var eventBus = new Vue();

Vue.component('product-tabs', {
    props: {
      reviews: {
          type: Array,
          required: true
      }
    },
    template:`
        <div>
            <div class="tabs-header">
                <span class="tab" 
                      :class="{ activeTab: selectedTab === tab }"
                      v-for="(tab, index) in tabs" 
                      :key="index" 
                      @click="selectedTab = tab">
                      {{ tab }}</span>
            </div>
            <div>
                <div v-show="selectedTab === 'Reviews'">
                    <h3>Reviews</h3>
                    <p v-if="reviews.length < 1">There are no reviews yet.</p>
                    <ul v-else>
                        <li v-for="(review, index) in reviews" :key="index">
                            <p><b>Review by: {{ review.name }}</b></p>
                            <p>{{ review.review }}</p>
                            <p>Rating: {{ review.rating }}</p>                            
                            <p>Would you recommend? {{ review.recommend}}</p>
                        </li>
                    </ul>                
                </div>
                <div v-show="selectedTab === 'Write a Review'">
                    <div class="review-form">
                        <product-review></product-review>
                    </div>
                </div>                                

            </div>              
        </div>      
    `,
    data: function () {
        return {
            tabs: ['Reviews', 'Write a Review'],
            selectedTab: 'Reviews'
        };
    }
});


Vue.component('product-review', {
   template: `
    <form @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <strong>Please correct the following error(s):</strong>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>    
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            Would you recommend this product:<br>
            <div class="recomend">
            <input type="radio" value="yes" v-model="recommend">
            <label for="yes">yes</label>
            <input type="radio" value="no" v-model="recommend">
            <label for="no">no</label>
            </div>
        </p>
        <p>
            <input class="submit" type="submit" value="Submit">
        </p>
        
    </form>
    
   `,
    data: function() {
       return {
           name: null,
           review: null,
           rating: null,
           recommend: null,
           errors: []
       }
    },
    methods: {
       onSubmit: function () {
           this.errors.length = 0;
           if (this.name && this.review && this.rating && this.recommend) {
               let productReview = {
                   name: this.name,
                   review: this.review,
                   rating: this.rating,
                   recommend: this.recommend
               };
               eventBus.$emit('review-submitted', productReview);
               this.name = null;
               this.review = null;
               this.rating = null;
               this.recommend = null;
               this.errors.length = 0;
           }
           else {
               if(!this.name) {
                  this.errors.push("Name is required.");
               }
               if(!this.review) {
                   this.errors.push("Review required");
               }
               if(!this.rating) {
                   this.errors.push("Rating is required");
               }
               if(!this.recommend) {
                   this.errors.push("You must recommend or not this product")
               }
           }

       }

    }
});

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul >
            <li v-for="detail in details">{{ detail }}</li>
        </ul>    
    `
});


Vue.component('product', {
    props: {
      premium: {
          type: Boolean,
          required: true
      }
    },
    template: `
            <div >
                <div class="product-content">
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
    
                        <!-- details go here -->
                        <product-details :details="details"></product-details>
                        
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
                                :class="{ disabledButton: !inStock }">add to cart
                       </button>
                                
                        <span class="remove-item" v-on:click="removeFromCart">remove item</span>
                        <!--<div class="itemsInCart" v-show="showItemsToRemove">-->
                            <!--<ul>-->
                                <!--<li v-on:click="removeItem">test</li>-->
                                <!--<li v-on:click="removeItem">test</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    </div>
                </div>
                <product-tabs :reviews="reviews"></product-tabs>
            </div>
    `,
    data: function () {
        return {
            //showItemsToRemove: false,
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
                    variantQuantity: 12
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
            reviews: []
        }
    },

    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function () {
            this.$emit('remove-item-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProductImage: function (index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale: function () {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ' + 'on sale!';
            } else {
                return this.brand + ' ' + this.product + ' ' + 'not on sale!';
            }

        },
        shipping: function () {
            if (this.premium) {
                return "Shipping is Free";
            }
            return "Shipping will be " + 2.99;
        }
    },
    mounted: function() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    }

});



var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        addItem(id) {
            this.cart.push(id)
        },
        removeItem(id) {
                for(var i = this.cart.length - 1; i >= 0; i--) {
                    if (this.cart[i] === id) {
                        this.cart.splice(i, 1)
                    }
                }
        }

    }
});