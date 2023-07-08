<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  />
  <div class="titleDiv">
    <h1>المفضلة</h1>
  </div>
  <div class="container">
    <div v-if="products.length === 0" style="text-align: center;">
      لم تقم بإضافة أي عنصر للمفضلة
    </div>
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.main_image" class="cardImg" :alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="card-footer">
              <div class="price-container">
                <p class="card-price">{{ product.product_price }}$</p>
              </div>
              <div class="favorite-container">
                <button
                  @click="removeFromFavorites(product)"
                  :class="{
                    'card-favorite': product.is_fav,
                    'not-fav': !product.is_fav,
                  }"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
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
  methods: {
    removeFromFavorites(product) {
      if (product.isFav) {
        console.log("Already removed from favorites or in progress");
        return;
      }

      const requestBody = {
        product_id: product.id,
      };

      Axios.post("/add-to-fav", requestBody)
        .then((response) => {
          product.isFav = false;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
  height: 300px;
  border-radius: 15px;
  background-color: #f7f5ef;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.cardImg {
  width: 100%;
  height: 150px;
  transition: transform 0.2s ease-in-out;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-bottom: 10px;
}

.cardImg:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.noProducts {
  margin-left: 45%;
  width: 50%;
  margin-top: 20px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1) sepia(0) saturate(1) hue-rotate(0deg);
}

.carousel-inner {
  margin-left: 10%;
}

.carousel-item {
  margin-left: 3%;
}
.card-body {
  display: flex;
  flex-direction: column;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  background-color: transparent;
}

.price-container {
  display: flex;
  align-items: center;
}

.card-price {
  font-weight: bold;
  margin-right: 5px;
}

.favorite-container {
  display: flex;
}

.card-favorite,
.not-fav {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.card-favorite i,
.not-fav i {
  font-size: 16px;
  color: rgb(190, 18, 47);
  transition: color 0.3s ease;
  font-size: 25px;
}

.card-favorite:hover i,
.not-fav:hover i {
  color: rgba(190, 18, 47, 0.314);
}

.not-fav i {
  color: lightgray;
}
</style>
