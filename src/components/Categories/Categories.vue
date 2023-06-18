<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3" v-for="category in categories" :key="category.id">
        <div class="card">
          <img :src="category.image" class="cardImg" :alt="category.name" />
          <div class="card-body">
            <h5 class="card-title">{{ category.title }}</h5>
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
      categories: [],
    };
  },
  mounted() {
    Axios.get("/categories")
      .then((response) => {
        this.categories = response.data.data.map((category) => ({
          ...category,
          isFavorite: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  margin-top: 60px;
}
.card {
  background-color: #f7f5ef;
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
