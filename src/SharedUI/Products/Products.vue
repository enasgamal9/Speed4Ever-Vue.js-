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
          <img :src="product.main_image" class="cardImg" :alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <small class="card-category">{{ product.category_id }}</small>
            <p class="card-category">{{ product.product_price }}$</p>
            <button
              @click="addToFavorites(product)"
              :disabled="product.isFavorite || product.isAddingToFavorite"
              class="btn btn-primary favBtn"
            >
              {{
                product.isAddingToFavorite
                  ? "جار الإضافة.."
                  : product.isFavorite
                  ? "مضاف بالفعل للمفضلة"
                  : "إضافة إلى المفضلة"
              }}
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
    productsEndpoint: {
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
    Axios.get(this.productsEndpoint)
      .then((response) => {
        console.log(response.data.data);
        this.products = response.data.data.map((product) => ({
          ...product,
          isFavorite: false,
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

      product.isAddingToFavorite = true;

      const requestBody = {
        product_id: product.id,
      };

      Axios.post("/add-to-fav", requestBody)
        .then((response) => {
          console.log("Added to favorites:", response.data);
          product.isFavorite = true;
          product.isAddingToFavorite = false;
        })
        .catch((error) => {
          console.log("Error adding to favorites:", error);
          product.isAddingToFavorite = false;
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

.favBtn {
  background-color: #49687c;
  border: none;
}

.favBtn:hover {
  background-color: #49687ca9;
  border: none;
}
</style>
