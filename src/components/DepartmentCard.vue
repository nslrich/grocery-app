<template>
  
  <div class="department-card">
    <h4 class="department-name">{{ name }}</h4>
  </div>

</template>

<script>
  export default {
    name: "DepartmentCard",
    props: {
      name: String,
    }    
  } 
</script>

<style scoped>

  .department-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 175px;
    height: 175px;
    background-color: var(--primary-color);
    color: black;
    padding: .5rem;
    border-radius: 10px;
    cursor: pointer;
    margin: 1rem;
  }

  .department-card:hover {
    background-color: var(--secondary-hover-color);
  }

  .department-name {
    text-align: center;
  }

</style>