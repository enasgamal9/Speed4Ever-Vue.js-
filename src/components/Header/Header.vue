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
      <div class="header-content">
        <div class="header-flex">
          <img
            src="../../../public/images/header.png"
            alt="Speed4Ever Shopping Header Image"
            class="header-photo"
          />
          <h1 class="header-title">!اشتر الآن</h1>
        </div>
      </div>
    </div>
  </header>
</template>

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

.header-photo {
  margin-left: 15%;
  margin-right: 15%;
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
  /* Adjustments for screens up to 768px wide */
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
}
</style>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import headerImage from "@/assets/images/header.png";

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
    };
  },
};
</script>
