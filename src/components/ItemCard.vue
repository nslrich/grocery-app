<template>
  <div class="item-card">
    <img alt="Vue logo" src="../assets/logo.png" @click="itemDetails"/>
    <div class="item-name" @click="itemDetails">{{ item.name }}</div>
    <div class="item-price" @click="itemDetails">${{ item.price }}</div>
    <div class="item-category" @click="itemDetails">{{ item.category }}</div>
    <button :id="`item-add-${item.id}`" :class="['item-add', addShow ? '' : 'hidden']" @click="addToCart">Add to Cart</button> <!-- class="item-add" -->
     <div :id="`item-qty-bar-${item.id}`" :class="['item-qty-bar', addShow ? 'hidden' : '']"> <!-- class="item-qty-bar" -->
      <button class="item-change-qty sub-qty" @click="decreaseQty">&minus;</button>
      <div :id="`item-qty-${item.id}`" class="item-qty">{{ qty }}</div>
      <button class="item-change-qty add-qty" @click="increaseQty">&plus;</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemCard",
    props: {
      item: Object,
      cart: Array,
    },
    data() {
      return {
        qty: 0,
        addShow: true,
      }
    },
    created() {
      console.log(this.cart);
      for (var c of this.cart) {
        if (this.item.id === c.id) {
          this.qty = c.qty;
          this.addShow = false;
          break;
        } 
      }
    },
    methods: {
      itemDetails() {
        console.log('item details');
      },
      addToCart() {
        this.qty = 1;
        this.addShow = false;
        this.$emit('add-item', this.item, this.qty);
      },
      decreaseQty() {
        this.qty = this.qty - 1;
        document.getElementById(`item-qty-${this.item.id}`).innerText = this.qty;

        if (this.qty == 0) {
          this.addShow = true;

          this.$emit('remove-item', this.item);
        } else {
          this.$emit('change-qty', this.item, this.qty);
        }
      },
      increaseQty() {
        this.qty = this.qty + 1;
        document.getElementById(`item-qty-${this.item.id}`).innerText = this.qty;
        this.$emit('change-qty', this.item, this.qty);
      }
    }
  }
</script>

<style scoped>

  .item-card {
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    padding: .5rem;
    border-radius: 10px;
    color: black;
    text-align: center;
    width: 250px;
    cursor: pointer;
    margin: 1rem;
  }

  .item-name {
    font-size: 19px;
    font-weight: 500;
    margin-top: .2rem;
    height: 60px;
  }

  .item-price {
    font-size: 17px;
    font-weight: 400;
    margin-top: .2rem;
    margin-bottom: .2rem;
  }

  .item-category {
    font-size: 15px;
    margin-bottom: .6rem;
  } 

  .item-add {
    display: inline-block;
    font-size: 15px;
    background-color: var(--primay-accent-color);
    border-color: var(--primary-bg-color);
    border-radius: 5px;
    padding: .4rem 0rem;
  }

  .item-add:hover {
    /* background-color: var(--tertiary-accent-color); */
    background-color: var(--primay-accent-color-dark);
  }

  .item-qty-bar {
    display: flex;
    justify-content: center;
  }

  .item-change-qty {
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

  .item-qty {
    border-top: 2px solid var(--primary-bg-color);
    border-bottom: 2px solid var(--primary-bg-color);
    width: 175px;
    font-size: 18px;
    padding-top: 1px;
  }

  .hidden {
    display: none;
  }

  img {
    height: 150px;
    width: 150px;
    margin: auto;
  }

</style>