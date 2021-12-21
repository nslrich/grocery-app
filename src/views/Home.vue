<template>

  <div class="container">

    <h2 class="page-head">Welcome, Start Shopping!</h2>

    <div class="grid">
      <DepartmentCard name="Departments" @click="goTo(1)"/>
      <!-- <DepartmentCard name="Categories" @click="goTo(2)"/> -->
      <DepartmentCard name="View All Items" @click="goTo(3)"/>
    </div>
  </div>
  
</template>

<script>
  import DepartmentCard from '../components/DepartmentCard.vue';

  export default {
    name: "Home",
    components: {
      DepartmentCard
    },
    props: {

    },
    methods: {
      goTo(id) {
        if (id === 1) {
          this.$router.push({name: 'Departments'});
        } else if (id === 2) {
          this.$router.push({name: 'Categories'});
        } else if (id === 3) {
          this.$router.push({name: 'All Items'});
        }
      }
    }
  }
</script>

<style scoped>

</style>