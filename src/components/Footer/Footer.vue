<template>
  <footer class="footer">
    <div class="section">
      <p>
        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
        النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
        النصوص
      </p>
    </div>
    <div class="section">
      <h3>روابط مهمة</h3>
      <ul>
        <li><a href="#" class="footerLink">الرئيسية</a></li>
        <li><a href="#" class="footerLink">من نحن</a></li>
        <li><a href="#" class="footerLink">إتصل بنا</a></li>
      </ul>
    </div>
    <div class="section">
      <h3>الأقسام الرئيسية</h3>
      <ul>
        <li><a href="#" class="footerLink">الأسئلة الشائعة</a></li>
        <li><a href="#" class="footerLink">سياسة الخصوصية</a></li>
        <li><a href="#" class="footerLink">الشروط و الأحكام</a></li>
      </ul>
    </div>
    <div class="sectionApp">
      <div class="left-section">
        <img
          src="../../../public/images/app.svg"
          alt="Speed4Ever Icon"
          width="200"
        />
      </div>
      <div class="right-section">
        <h4>احصل على أفضل العروض من خلال تطبيقنا</h4>
        <div class="app-download">
          <div class="app-buttons">
            <a href="#"
              ><img
                src="../../../public/images/appStore.svg"
                alt="Download Speed4Ever appStore"
            /></a>
            <a href="#"
              ><img
                src="../../../public/images/playStore.svg"
                alt="Download Speed4Ever playStore"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #1c1d20;
  color: white;
  display: flex;
  margin-top: 60px;
  text-align: right;
  padding: 50px;
  justify-content: space-between;
}

.section {
  padding: 20px;
  margin-top: 50px;
  width: 300px;
}

.section h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.section p {
  flex: 1;
  font-size: 14px;
}

.section ul {
  list-style: none;
  padding: 0;
}

.section ul li {
  margin-bottom: 5px;
  font-size: 14px;
}

.app-download {
  display: flex;
  align-items: center;
}

.app-download img {
  height: 40px;
  margin-right: 10px;
}

.app-buttons {
  display: flex;
}

.footerLink {
  color: white;
  text-decoration: none;
}

.footerLink:hover {
  color: #6c98a2;
}

.sectionApp {
  display: flex;
  align-items: center;
}

.left-section {
  margin-right: 20px;
}

.left-section img {
  width: 140px;
  margin-left: 70px;
}

.right-section {
  display: flex;
  flex-direction: column;
}

.right-section h4 {
  width: 300px;
  text-align: center;
}

.app-download {
  margin-top: 20px;
  margin-left: 30px;
}

.app-buttons {
  display: flex;
}

@media (max-width: 1024px) {
  .footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section {
    margin: 20px 0;
  }

  .section h3 {
    font-size: 16px;
  }

  .section p {
    width: auto;
  }

  .section ul li {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .app-download {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .app-download img {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .right-section {
    align-items: center;
    margin-left: 0;
    margin-top: 20px;
  }

  .right-section h4 {
    width: auto;
    text-align: center;
  }

  .app-download {
    margin-top: 10px;
    margin-left: 0;
  }

  .app-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 900px) {
  .section{
    display: none;
  }
}
</style>
