<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="row">
      <div
        class="col-md-3"
        v-for="product in products.slice(0, 4)"
        :key="product.id"
      >
        <div class="card">
          <img :src="product.thumbnail" class="cardImg" :alt="product.title" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <small class="card-category">{{ product.category }}</small>
            <p class="card-category">{{ product.price }}$</p>
            <button @click="addToFavorites(product)" :disabled="product.isFavorite || product.isAddingToFavorite" class="btn btn-primary favBtn">
              {{ product.isAddingToFavorite ? 'Adding...' : (product.isFavorite ? 'Added to Favorites' : 'Add to Favorites') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Axios from "../../Axios.js";

export default {
  name: "Products",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    Axios.get("/products")
      .then((response) => {
        console.log(response.data.products);
        this.products = response.data.products.map(product => ({
          ...product,
          isFavorite: false
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addToFavorites(product) {
  if (product.isFavorite || product.isAddingToFavorite) {
    console.log("Already added to favorites or in progress");
    return;
  }

  product.isAddingToFavorite = true; // Set the isAddingToFavorite property to true

  const requestBody = {
    product_id: product.id,
  };

  Axios.post("/add-to-fav", requestBody)
    .then((response) => {
      console.log("Added to favorites:", response.data);
      product.isFavorite = true;
      product.isAddingToFavorite = false; // Reset the isAddingToFavorite property
    })
    .catch((error) => {
      console.log("Error adding to favorites:", error);
      product.isAddingToFavorite = false; // Reset the isAddingToFavorite property
      // Handle error response if needed
    });
},

  },
};
</script>


<style scoped>
.container {
  margin-top: 70px;
}

h1 {
  text-align: center;
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

.favBtn{
  background-color: #49687C;
  border: none;
}

.favBtn:hover{
  background-color: #49687ca9;
  border: none;
}
</style>
