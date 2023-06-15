<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3" v-for="product in products" :key="product.id">
          <div class="card">
            <img :src="product.thumbnail" class="cardImg" :alt="product.title" />
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Axios from "../../Axios.js";
  
  export default {
    name: "Categories",
    data() {
      return {
        products: [],
      };
    },
    mounted() {
      Axios.get("/products")
        .then((response) => {
          console.log(response.data.products);
          this.products = response.data.products;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
</script>

<style scoped>

.container{
    margin-top: 60px;
}
.card{
    background-color: #F7F5EF;
    max-width: 200px;
    max-height: 180px;
    margin-top: 30px;
}
.cardImg {
  width: 100%;
  max-width: 200px;
  max-height: 100px;
}

.card-title {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
</style>
