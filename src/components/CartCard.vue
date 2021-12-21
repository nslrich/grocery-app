<template>
  <div class="cart-card">
    <img src="../assets/logo.png" alt="Item" class="cart-card-img">
    <div class="cart-card-name">{{ item.name }}</div>
    <div class="cart-card-price">${{ item.price }}</div>
    <div class="cart-card-qty">
      <button class="cart-change-qty sub-qty" @click="decreaseQty">&minus;</button>
      <div class="cart-qty">{{ item.qty }}</div>
      <button class="cart-change-qty add-qty" @click="increaseQty">&plus;</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartCard",
    props: {
      item: Object
    }
  }
</script>

<style scoped>

  .cart-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .4rem .6rem;
    background-color: var(--primary-color);
    color: black;
    border-radius: 10px;
    margin-bottom: .5rem;
  }

  .cart-card-img {
    height: 50px;
    width: 50px;
    margin-right: .5rem;
  }

  .cart-card-name {
    font-size: 18px;
    font-weight: 400;
    width: 100%;
  }

  .cart-card-price {
    font-size: 18px;
    margin-right: .4rem;
  }

  .cart-card-qty {
    display: flex;
    flex-direction: row;
  }

  .cart-change-qty {
    font-size: 18px;
    background-color: var(--primay-accent-color);
    border-color: var(--primary-bg-color);
    padding: .275rem .5rem;
  }

  .sub-qty {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .add-qty {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .cart-qty {
    border-top: 2px solid var(--primary-bg-color);
    border-bottom: 2px solid var(--primary-bg-color);
    width: 50px;
    font-size: 18px;
    padding-top: 1px;
    text-align: center;
  }

  @media (min-width: 0em) and (max-width: 40em) {
    .cart-card {
      width: 325px;
    }
  }

  @media (min-width: 40em) {
    .cart-card {
      width: 500px;
    }
  }

</style>