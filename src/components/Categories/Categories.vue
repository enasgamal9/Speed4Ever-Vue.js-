<template>
  <div class="container">
    <div class="row allCategories">
      <div class="col-6 col-md-3" v-for="(category, index) in categories" :key="index">
        <div class="card categoryItem">
          <img :src="category.image" class="cardImg" :alt="category.name" />
          <div class="card-body">
            <h5 class="card-title">
              {{ category.name ? category.name : getCategoryName(index) }}
            </h5>
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
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //Category name is returned as null from back-end
    getCategoryName(index) {
      const staticNames = [
        "تصميم المواقع",
        "إكسسوارات الهواتف",
        "الساعات الذكية",
        "الإكسسوارات",
        "عقارات",
        "هواتف",
        "أثاث",
      ];
      return staticNames[index] || "قسم";
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 60px;
}

.card {
  background-color: #f7f5ef;
  max-width: 150px;
  max-height: 180px;
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
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

.categoryItem {
  border-radius: 15px;
  padding-bottom: 10px;
  margin-left: 10%;
}

.categoryItem img {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-bottom: 10px;
}

.allCategories {
  width: 80%;
  margin-left: 10%;
  margin-top: 100px;
  margin-bottom: 100px;
}

@media (max-width: 900px) {
  .col-md-3 {
    flex-basis: 50% ;
    max-width: 50%;
  }
}

</style>
