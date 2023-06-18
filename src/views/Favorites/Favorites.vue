<template>
  <div class="titleDiv">
    <h1>المفضلة</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.main_image" class="cardImg" :alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <small class="card-category">{{ product.category_id }}</small>
            <p class="card-category">{{ product.product_price }}$</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Axios from "../../Axios.js";
import Footer from "../../components/Footer/Footer.vue";

export default {
  name: "Favorites",
  components: {
    Footer,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    Axios.get("/myFavourites")
      .then((response) => {
        console.log(response.data.data);
        this.products = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  margin-top: 70px;
}

.titleDiv {
  background-image: url("../../../public/images/banner.png");
  background-color: #f7f5ef;
  background-size: 100%;
  background-repeat: no-repeat;
  height: 150px;
}

h1 {
  text-align: center;
  padding-top: 50px;
}

small {
  color: gray;
}

.card {
  margin-top: 30px;
  border: none;
}

.cardImg {
  width: 100%;
  height: 150px;
  border-radius: 15px;
  transition: transform 0.2s ease-in-out;
}

.cardImg:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
</style>
