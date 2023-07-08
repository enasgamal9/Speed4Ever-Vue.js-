<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-..."
    crossorigin="anonymous"
  />
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="row">
      <div
        class="col-md-3"
        v-for="product in displayedProducts"
        :key="product.id"
      ></div>
    </div>

    <div
      v-if="products.length > 3"
      id="productCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(productGroup, index) in productGroups"
          :key="index"
          :class="{ active: index === 0 }"
        >
          <div class="row">
            <div
              class="col-md-3"
              v-for="product in productGroup"
              :key="product.id"
            >
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
                      @click="addToFavorites(product)"
                      :class="{ 'card-favorite': product.is_fav, 'not-fav': !product.is_fav }"
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
      </div>
      <button
        class="carousel-control-prev light"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon light"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden light">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-if="products.length === 0" class="noProducts">
      <p>لا توجد عروض الآن</p>
    </div>
  </div>
</template>

<script>
import Axios from "../../Axios.js";
import Swal from "sweetalert2";

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
  computed: {
    displayedProducts() {
      if (this.products.length > 3) {
        return this.products.slice(0, 3);
      } else {
        return this.products;
      }
    },
    productGroups() {
      const groups = [];
      for (let i = 0; i < this.products.length; i += 3) {
        groups.push(this.products.slice(i, i + 3));
      }
      return groups;
    },
  },
  mounted() {
    Axios.get(this.productsEndpoint)
      .then((response) => {
        console.log(response.data.data);
        this.products = response.data.data.map((product) => ({
          ...product
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    this.$nextTick(() => {
      import("bootstrap/js/dist/carousel.js").then(() => {
        new bootstrap.Carousel(document.getElementById("productCarousel"), {
          interval: false,
        });
      });
    });
  },

  methods: {
    addToFavorites(product) {
     

      const token = localStorage.getItem("token");
      const isLoggedIn = !!token;

      if (!isLoggedIn) {
        Swal.fire({
          icon: "warning",
          title: "تنبيه",
          text: "يجب تسجيل الدخول أولاً!",
          confirmButtonText: "تسجيل الدخول",
          showCancelButton: true,
          cancelButtonText: "إلغاء",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });

        return;
      }


      const requestBody = {
        product_id: product.id,
      };

      if (product.is_fav) {
        Axios.post("/add-to-fav", requestBody)
        .then((response) => {
          console.log("Added to favorites:", response.data);
          product.is_fav = false;
        })
        .catch((error) => {
          console.log("Error adding to favorites:", error);
        });
      }

      else{
        Axios.post("/add-to-fav", requestBody)
        .then((response) => {
          console.log("Added to favorites:", response.data);
          product.is_fav = true;
        })
        .catch((error) => {
          console.log("Error adding to favorites:", error);
        });
      }

      
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
  padding-left: 15%;
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

.card-favorite, .not-fav {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.card-favorite i, .not-fav i {
  font-size: 16px;
  color: rgb(190, 18, 47);
  transition: color 0.3s ease;
  font-size: 25px;
}

.card-favorite:hover i, .not-fav:hover i {
  color: rgba(190, 18, 47, 0.314);
}

.not-fav i{
  color: lightgray;
}

@media (max-width: 770px) {
  .carousel-inner {
    padding-left: 10%;
    padding-right: 5%;
  }
  .col-md-3 {
    flex-basis: 5% ;
    max-width: 30% ;
  }
  .card-footer {
    display: block;
    margin-top: 0;
  }
}

</style>
