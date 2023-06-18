<template>
  <div class="image-text-container">
    <div class="circularBG"></div>
    <img src="../../../public/images/sale.png" alt="Sale Speed4Ever" class="image" />
    <div class="text-container">
      <p>خصم هائل</p>
      <h2>مجموعة جديدة</h2>
      <h5>!تسوق الآن</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sale",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.image-text-container {
  display: flex;
  align-items: center;
  background-color: #49687c;
  position: relative;
  margin-top: 50px;
}

.image {
  margin-left: 16%;
  z-index: 1;
}

.circularBG {
  width: 450px;
  height: 450px;
  background-color: #34596c;
  position: absolute;
  left: 15%;
  border-radius: 50%;
}

.text-container {
  flex: 1;
  margin-left: 150px;
  color: white;
}

.text-container > h2 {
  font-size: 40px;
  margin-bottom: 10px;
  font-weight: 600;
}

.text-container > p {
  font-size: 22px;
  font-weight: 100;
  margin-left: 35%;
}

.text-container > h5 {
  font-size: 22px;
  font-weight: 300;
  margin-top: 40px;
}

@media (max-width: 900px) {
  .image-text-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .image {
    margin-left: 0;
    margin-bottom: 20px;
  }

  .circularBG {
    width: 300px;
    height: 300px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .text-container {
    margin-left: 0;
    text-align: center;
  }

  .text-container > h2 {
    font-size: 32px;
  }

  .text-container > p,
  .text-container > h5 {
    font-size: 18px;
  }

  .text-container > h5 {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
