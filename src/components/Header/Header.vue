<template>
  <header class="header">
    <div class="socialClass">
      <a href="#" class="social-icon facebook"><font-awesome-icon :icon="faFacebookF"/></a>
      <a href="#" class="social-icon twitter"><font-awesome-icon :icon="faTwitter"/></a>
      <a href="#" class="social-icon instagram"><font-awesome-icon :icon="faInstagram"/></a>
    </div>
    <div class="thinerHeader">
      <div class="headerContent">
        <div class="headerFlex">
          <img
            src="../../../public/images/header.png"
            alt="Blue"
            class="headerPhoto"
          />
          <h1 class="headerTitle">!اشتر الآن</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.header {
  background-color: #fbf9f4;
  width: 100%;
  overflow-x: hidden;
}

.thinerHeader {
  background-color: #edf0f3;
  width: 90%;
  margin-left: 10vw;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  margin-top: -365px;
}

.headerFlex {
  display: flex;
  align-items: center;
}

.headerPhoto {
  margin-left: 15%;
  margin-right: 15%;
}

.headerTitle {
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

.socialClass {
  margin-top: 200px;
}

.social-icon.facebook:hover {
  background-color: #3b5998; /* Facebook blue */
  color: white;
}

.social-icon.twitter:hover {
  background-color: #1da1f2; /* Twitter blue */
  color: white;
}

.social-icon.instagram:hover {
  background-color: #e1306c; /* Instagram pink */
  color: white;
}

@media (max-width: 768px) {
  /* Adjustments for screens up to 768px wide */
  .thinerHeader {
    margin-left: 0;
    border-radius: 0;
    margin-top: 0;
  }
  
  .headerFlex {
    flex-direction: column;
  }
  
  .headerPhoto {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .headerTitle {
    font-size: 30px;
  }
  
  .socialClass {
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
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
