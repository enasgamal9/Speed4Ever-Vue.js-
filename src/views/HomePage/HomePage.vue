<template>
  <div>
    <Header />
    <AboutUs />
    <Categories />
    <Products  :title="productsTitle1"/>
    <Sale />
    <Products  :title="productsTitle2"/>
  </div>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import AboutUs from "../../components/AboutUs/AboutUs.vue";
import Categories from "../../components/Categories/Categories.vue";
import Products from "../../SharedUI/Products/Products.vue";
import Sale from "../../components/Sale/Sale.vue";

export default {
  name: "HomePage",
  components: {
    Header,
    AboutUs,
    Categories,
    Products,
    Sale
  },
  data() {
    return {
      productsTitle1: "أحدث المزادات",
      productsTitle2: "أحدث الإضافات"
    };
}
  };
</script>
