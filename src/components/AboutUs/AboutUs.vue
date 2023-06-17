<template>
    <img
      src="../../../public/images/aboutUs.webp"
      alt="About Us"
      class="aboutUsImage"
    />
    <div class="aboutUs">
      <div class="aboutUsContent">
        <h2 class="aboutUsTitle">معلومات عنّا</h2>
        <p class="aboutUsText">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
          تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات
          كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد
          لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن
          يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا
          مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر
          على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه
          التصميم فيظهر بشكل لا يليق.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutUs",
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .aboutUs {
    display: inline-block;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 100px;
    margin-left: 20%;
    background-color: #f7f5ef;
    border: 1px solid #f0f2f3;
    border-radius: 25px;
  }
  
  .aboutUsImage {
    max-width: 35%;
    border-radius: 20px;
    position: absolute;
    top: 130%;
    left: 10%;
    transition: transform 0.2s ease-in-out;
  }

  .aboutUsImage:hover {
    transform: scale(1.05);
}
  
  .aboutUsContent {
    padding: 50px;
    padding-left: 500px;
    position: relative;
    text-align: right;
  }
  
  .aboutUsTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-direction: row-reverse;
  }
  
  .aboutUsText {
    font-size: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    flex-direction: row-reverse;
    align-items: center;
    max-width: 400px;
  }
  
  @media (max-width: 768px) {
    .aboutUs {
      margin-left: 5%;
    }
  
    .aboutUsImage {
      max-width: 100%;
      position: static;
      margin-bottom: 20px;
      transition: transform 0.2s ease-in-out;
    }

    .aboutUsImage:hover {
        transform: scale(1.05);
      }
  
    .aboutUsContent {
      padding: 20px;
      padding-left: 0;
    }
  
    .aboutUsTitle {
      text-align: center;
    }
  
    .aboutUsText {
      max-width: none;
      text-align: justify;
    }
  }
  </style>
  