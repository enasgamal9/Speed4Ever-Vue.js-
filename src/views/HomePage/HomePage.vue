<template>
  <div class="homePageClass">
    <Header />
    <AboutUs />
    <Categories />
    <Products :title="productsTitle1" productsEndpoint="/latest-auctions" />
    <Sale />
    <Products :title="productsTitle2" productsEndpoint="/latest-products" />
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import AboutUs from "../../components/AboutUs/AboutUs.vue";
import Categories from "../../components/Categories/Categories.vue";
import Products from "../../SharedUI/Products/Products.vue";
import Sale from "../../components/Sale/Sale.vue";
import Footer from "../../components/Footer/Footer.vue";

export default {
  name: "HomePage",
  components: {
    Header,
    AboutUs,
    Categories,
    Products,
    Sale,
    Footer,
  },
  data() {
    return {
      productsTitle1: "أحدث المزادات",
      productsTitle2: "أحدث الإضافات",
    };
  },
};
</script>

<style scoped>
  .homePageClass{
      background-color: #FBF9F4;

  }
</style>