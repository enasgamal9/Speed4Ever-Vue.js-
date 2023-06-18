<template>
  <div>
    <Header />
    <AboutUs />
    <Categories />
    <!--/latest-products    /latest-auctions-->
    <Products :title="productsTitle1" products-url="/products" />
    <Sale />
    <Products :title="productsTitle2" products-url="/products" />
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
