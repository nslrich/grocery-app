<template>
  <div class="container">

    <h2 class="page-head">{{ title }}</h2>

    <div class="search-bar">
      <input type="text" class="item-search" placeholder="Search" @change="searchItems"/>
    </div>

    <div class="grid">
      <div v-for="item in filtered_items" :key="item.id">
        <ItemCard :item="item" :cart="cart" @add-item="addItem" @change-qty="changeQty" @remove-item="removeItem"/>
      </div>
    </div>
  </div>

  <!-- The Modal -->
  <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Some text in the Modal..</p>
    </div>

  </div>
</template>

<script>
  import ItemCard from '../components/ItemCard.vue';

  export default {
    name: 'Items',
    props: {
      items: Array,
      cart: Array,
    },
    components: {
      ItemCard
    },
    data() {
      return {
        title: '',
        department: '',
        category: '',
        search: '',
        loaded_items: [],
        filtered_items: [],
        filter: ''
      }
    },
    created() {

      this.department = this.$route.params.department;
      this.category = this.$route.params.category;

      if (this.category === 'All') {
        this.title = `${this.department} Items`;
        this.filtered_items = this.items.filter(item => item.department === this.department);
      } else {
        this.title = `${this.category}`;
        this.filtered_items = this.items.filter(item => item.category === this.category);
      }

      this.loaded_items = this.filtered_items;
    },
    methods: {
      searchItems(event) {
        var { value } = event.target;
        
        if (value === '') {
          this.filtered_items = this.loaded_items;
        } else {
          this.filtered_items = this.loaded_items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }
      },
      addItem (item, qty) {
        this.$emit('add-to-cart', item, qty);
      },
      changeQty (item, qty) {
        this.$emit('change-item-qty', item, qty);
      },
      removeItem(item) {
        this.$emit('remove-item-from-cart', item);
      }
    }
  }
</script>

<style scoped>

  .search-bar {
    display: flex;
    justify-content: center;
  }

  .item-search {
    font-size: 18px;
    border-radius: 3px;
    border: 2px solid var(--primay-accent-color);
    padding: .3rem .5rem;
    width: 15rem;
  }

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

</style>