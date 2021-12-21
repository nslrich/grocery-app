<template>
  <div class="container">

    <h2 class="page-head">Departments</h2>

    <div class="grid">
      <div v-for="dept in departments" :key="dept.id">
        <DepartmentCard :name="dept.name" @click="goToCategory(dept.name)" />
      </div>
    </div>
  </div>
</template>

<script>
  import DepartmentCard from '../components/DepartmentCard.vue';

  export default {
    name: "Departments",
    components: {
      DepartmentCard
    },
    props: {
      departments: Array,
    },
    methods: {
      goToCategory(id) {
        this.$router.push({name: "Categories", params: {department: id}});
      }
    }
  }
</script>

<style scoped>

</style>