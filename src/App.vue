<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <router-link class="nav-bar-logo" to="/"> <img class="nav-bar-image" src="./assets/logo.png" /> </router-link>
      <router-link to="/departments" class="nav-bar-link">Shop</router-link>
      <router-link to="/items" class="nav-bar-link">Search</router-link>
    </div>
    <div class="nav-bar-right">
      <div class="nav-bar-search">
        <!-- <input type="text" class="nav-bar-search-input" placeholder="Search" /> -->
      </div>
      <router-link class="nav-bar-cart" to="/cart">
        <div>
          <div class="nav-bar-cart-item">${{ cart_price.toFixed(2) }}</div>
          <div class="nav-bar-cart-item">{{ cart_items }} items</div>
        </div>
        <img id="cart-image" class="nav-bar-cart-image" src="./assets/cart-color.svg" />
      </router-link>
    </div>
  </div>

  <router-view :items="items" :departments="departments" :cart="cart" 
    @add-to-cart="addItemToCart" @change-item-qty="changeItemInCart" @remove-item-from-cart="removeItemFromCart"
  />
</template>

<script>
  import rawData from './assets/data.json';

  export default {
    data() {
      return {
        cart_items: 0,
        cart_price: 0.00,
        cart: [],
        items: rawData.products,
        departments: rawData.departments
      }
    },
    created() {

      // Clear cart
      // localStorage.removeItem('cart');

      if (localStorage.getItem('cart')) {
        try {
          this.cart = JSON.parse(localStorage.cart);

          for (var item of this.cart) {
            this.cart_items = this.cart_items + item.qty;
            this.cart_price = this.cart_price + item.price;
          }

        } catch (error) {
          localStorage.removeItem('cart');
        }
      }
    },
    methods: {
      changeCart() {
        document.getElementById('cart-image').setAttribute('src', './assets/cart-bg.svg');
      },
      addItemToCart(item, qty) {
        item.qty = qty;
        this.cart.push(item);

        this.cart_items = this.cart_items + qty;
        this.cart_price = this.cart_price + item.price;

        this.saveCart();
      },
      removeItemFromCart(item) {

        var found = -1;
        var index = 0;

        var temp = this.cart;
        for (var t of temp) {
          if (t.id === item.id) {
            found = index;
            break;
          }
          index++;
        }

        if (found !== -1) {
          var new_price = this.cart_price - temp[index].price;
          var new_items = this.cart_items - 1;

          temp.splice(index, 1);

          this.cart = temp;
          this.cart_items = new_items;
          this.cart_price = new_price;

          this.saveCart();
        }
      },
      changeItemInCart(item, qty) {

        var total_qty = 0;
        var total_price = 0;
        
        var temp = this.cart;
        for (var t of temp) {
          if (t.id === item.id) {
            t.qty = qty;
          }

          total_qty = total_qty + t.qty;
          total_price = total_price + (t.price * t.qty);
        }

        this.cart = temp;
        this.cart_items = total_qty;
        this.cart_price = total_price;

        this.saveCart();
      },
      saveCart() {
        var str = JSON.stringify(this.cart);
        localStorage.setItem('cart', str);
      }
    }
  }
</script>

<style>
  
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

  :root {
    --primary-bg-color: #252626;
    --primary-color: #ffffff;
    --primay-accent-color: #cf9d33;
    --primay-accent-color-dark: #9c7728;
    --secondary-bg-color: #343a40;
    --secondary-accent-color: #00A8CC;
    --tertiary-bg-color: #4e4e4e;
    --tertiary-accent-color: #41b883;
    --hover-color: #181818;
    --secondary-hover-color: #adadad;
  }

  ::-webkit-scrollbar {
    width: 1em;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-bg-color);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primay-accent-color);
    border: 0.25em solid var(--secondary-bg-color);
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-hover-color)
  }

  body {
    /* Get rid of that weird ass default (margin: 8px???) */
    margin: 0px;

    font-family: 'Poppins', sans-serif;
    background-color: var(--primary-bg-color);
    color: var(--primary-color);
    font-weight: 300;
  }

  .jc-center {
    justify-content: center;
  }

  .txt-center {
    text-align: center;
  }

  .nav-bar {
    display: flex;
    width: 100%;
    background: var(--secondary-bg-color);
    color: var(--primay-accent-color);
    padding: .5rem 0rem;
    border-bottom: 1px solid var(--primay-accent-color);
    box-shadow: 0 0 9px var(--primay-accent-color);
  }

  .nav-bar-left {
    display: flex;
    justify-content: flex-start;
  }

  .nav-bar-right {
    width: 100%;
    margin-right: .75rem;
    display: flex;
    justify-content: flex-end;
  }

  .nav-bar-link {
    text-decoration: none;
    padding: .3rem .75rem;
    color: var(--primay-accent-color);
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
  }

  .nav-bar-link:hover {
    background-color: var(--primay-accent-color);
    color: var(--secondary-bg-color);
  }

  .nav-bar-logo {
    display: flex;
    align-items: center;
    padding: 0rem .75rem;
    margin-left: .5rem;
  }

  .nav-bar-image {
    height: 25px;
  }

  .nav-bar-search {
    display: flex;
    align-items: center;
  }

  .nav-bar-search-input {
    font-size: 18px;
    padding: .2rem .4rem;
  }

  .nav-bar-cart {
    display: flex;
    flex-direction: row;
    padding: 0rem .75rem;
    text-decoration: none;
    color: var(--primay-accent-color);
  }

  .nav-bar-cart:hover {
    background-color: var(--primay-accent-color);
    color: var(--secondary-bg-color);
  }

  .nav-bar-cart-item {
    font-size: 14px;
    font-weight: 400;
  }

  .nav-bar-cart-logo {
    display: flex;
    align-items: center;
    margin-left: .7rem;
  }

  .nav-bar-cart-image {
    display: flex;
    align-self: center;
    height: 30px;
    margin-left: .4rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .page-head {
    text-align: center;
  }

  .grid {
    display: grid;
    justify-content: center;
    /* gap: 2rem; */
    padding: 1.5rem 5rem;
  }

  @media (min-width: 0em) and (max-width: 40em) {
    .grid {
      grid-template-columns: repeat(1, auto);
    }
  }

  @media (min-width: 40em) and (max-width: 57em) {
    .grid {
      grid-template-columns: repeat(2, auto);
    }
  }

  @media (min-width: 57em) and (max-width: 75em) {
    .grid {
      grid-template-columns: repeat(3, auto);
    }
  }

  @media (min-width: 75em) {
    .grid {
      grid-template-columns: repeat(4, auto);
    }
  }

  @media (min-width: 0em) and (max-width: 40em) {
    .nav-bar-search-input {
      display: none;
    }
  }

</style>
