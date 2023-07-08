<template>
  <header class="header">
    <div class="social-links">
      <a href="#" class="social-icon facebook">
        <FontAwesomeIcon :icon="faFacebookF" />
      </a>
      <a href="#" class="social-icon twitter">
        <FontAwesomeIcon :icon="faTwitter" />
      </a>
      <a href="#" class="social-icon instagram">
        <FontAwesomeIcon :icon="faInstagram" />
      </a>
    </div>
    <div class="thin-header">
      <div
        id="carouselExample"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-bs-target="#carouselExample"
            v-for="(image, index) in sliderImages"
            :key="index"
            :data-bs-slide-to="index"
            :class="{ active: index === currentIndex }"
          ></li>
        </ol>
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(image, index) in sliderImages"
            :key="index"
            :class="{ active: index === currentIndex }"
          >
            <img
              :src="image.image"
              class="d-block w-100"
              :alt="image.name"
            />
            <div class="carousel-caption">
              <h3>{{ image.name }}</h3>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExample"
          role="button"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExample"
          role="button"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Axios from "../../Axios.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

library.add(faFacebookF, faTwitter, faInstagram);

export default {
  name: "Header",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faFacebookF: faFacebookF,
      faTwitter: faTwitter,
      faInstagram: faInstagram,
      sliderImages: [],
      currentIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    currentImage() {
      return this.sliderImages.length > 0
        ? this.sliderImages[this.currentIndex].image
        : "";
    }
  },
  created() {
    this.fetchSliderData();
  },
  mounted() {
    this.$nextTick(() => {
      new bootstrap.Carousel(document.getElementById("carouselExample"));
    });
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    fetchSliderData() {
      Axios.get("/slider")
        .then((response) => {
          this.sliderImages = response.data.data.slice(1,);
          this.startSlider();
        })
        .catch((error) => {
          console.error("Failed to fetch slider data:", error);
        });
    },
    startSlider() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
      }, 3000);
    },
    stopSlider() {
      clearInterval(this.intervalId);
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #fbf9f4;
  width: 100%;
  overflow-x: hidden;
}

.thin-header {
  background-color: #edf0f3;
  width: 90%;
  margin-left: 10vw;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  margin-top: -365px;
}

.header-flex {
  display: flex;
  align-items: center;
}


.header-title {
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: center;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.social-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px;
  background-color: #333;
  color: white;
  margin-left: 50px;
  margin-top: 20px;
}

.social-links {
  margin-top: 200px;
  
}

.social-icon.facebook:hover {
  background-color: #3b5998;
  color: white;
}

.social-icon.twitter:hover {
  background-color: #1da1f2;
  color: white;
}

.social-icon.instagram:hover {
  background-color: #e1306c;
  color: white;
}

@media (max-width: 768px) {
  .header{
    display: flex;
  }
  .thin-header {
    margin-left: 0;
    border-radius: 0;
    margin-top: 0;
  }

  .header-flex {
    flex-direction: column;
  }

  .header-photo {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .header-title {
    font-size: 30px;
  }

  .social-links {
    margin-top: 20px;
  }

  .social-icon {
    margin-left: 10px;
    margin-top: 10px;
  }
  .sliderImg{
    border-top-left-radius: 25px !important;
  }
}
</style>
