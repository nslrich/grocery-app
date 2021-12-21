<template>
  <div class="container">

    <h2 class="page-head">Your Cart</h2>

    <div class="cart-body">
      <div class="cart-list">
        <div v-for="item in cart" :key="item.id">
          <CartCard :item="item"/>
        </div>
      </div>

      <div class="cart-info">
        <div class="row">
          <div class="cart-label">Price:</div>
          <div class="cart-data">${{ price.toFixed(2) }}</div>
        </div>

        <div class="row">
          <div class="cart-label">Tax:</div>
          <div class="cart-data">${{ tax.toFixed(2) }} @ {{ taxPercent * 100 }}%</div>
        </div>

        <hr />

        <div class="row">
          <div class="cart-label">Total:</div>
          <div class="cart-data">${{ total.toFixed(2) }}</div>
        </div>

        <div class="cart-buttons">
          <button class="cart-checkout">Checkout</button>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
  import CartCard from '../components/CartCard.vue';

  export default {
    name: "Cart",
    components: {
      CartCard
    },
    data() {
      return {
        price: 0,
        tax: 0,
        taxPercent: 0.05,
        total: 0
      }
    },
    props: {
      cart: Array
    },
    created() {
      this.calcTotals();
    },
    methods: {
      calcTotals() {
        var p = 0;
        for (var item of this.cart) {
          p = p + (item.price * item.qty); 
        }

        var t = p * this.taxPercent;

        this.price = p;
        this.tax = t;

        this.total = p + t;
      }
    }
  }
</script>

<style scoped>

  .cart-body {
    display: flex;
  }

  .cart-list {
    display: flex;
    flex-direction: column;
  }

  .cart-info {
    background-color: var(--primary-color);
    color: black;
    border-radius: 10px;
    width: 150px;
    padding: .5rem;
    height: 145px;
  }

  .cart-label {
    font-size: 18px;
    font-weight: 400;
  }

  .cart-data {
    font-size: 18px;
    margin-left: .4rem;
  }

  .cart-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: .5rem;
  }

  .cart-checkout {
    font-size: 15px;
    background-color: var(--primay-accent-color);
    border-color: var(--primary-bg-color);
    border-radius: 5px;
    padding: .4rem 0rem;
    width: 50%;
  }

  @media (min-width: 0em) and (max-width: 50em) {
    .cart-body {
      flex-direction: column;
      align-items: center;
    }

    .cart-info {
      width: 325px;
    }
  }

  @media (min-width: 50em) {
    .cart-body {
      flex-direction: row;
      justify-content: center;
    }

    .cart-info {
      width: 200px;
      margin-left: .5rem;
    }
  }

</style>