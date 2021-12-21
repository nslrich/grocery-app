<template>
  <div class="container">

    <h2 class="page-head">Categories for {{ department }}</h2>

    <div class="grid">
      <div v-for="category in categories" :key="category">
        <DepartmentCard :name="category"  @click="goToItems(category)"/>
      </div>
      <div>
        <DepartmentCard :name="`View All ${department} Items`" @click="goToItems('All')"/>
      </div>
    </div>
  </div>
</template>

<script>
  import DepartmentCard from '../components/DepartmentCard.vue';

  export default {
    name: "Category",
    components: {
      DepartmentCard
    },
    props: {
      departments: Array,
    },
    data() {
      return {
        department: '',
        categories: []
      }
    },
    created() {
      this.department = this.$route.params.department;

      for (var dept of this.departments) {
        if (this.department === dept.name) {
          this.categories = dept.categories;
          break;
        }
      }
    },
    methods: {
      goToItems (id) {
        this.$router.push({name: "Items", params: {department: this.department, category: id}})
      }
    }
  }
</script>

<style scoped>

</style>