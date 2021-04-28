<template>
  <main>
    <div class="info">
      <h1>Cant find what dog you want?</h1>
      <h4>
        Browse our collection of different breeds of dogs and lets see how many you
        bring home!
      </h4>
      <router-link id="more" to="/Colection">Browse dogs</router-link>
      <router-view />
    </div>

    <section>
      <div class="imges">
        <img
          src="..\assets\46372bd9d8ea018a5247a4ac5d9eabd1.jpg"
          alt=""
        />
      </div>
      <div class="imges">
        <img
          src="..\assets\oscar-sutton-yihlaRCCvd4-unsplash.jpg"
          alt=""
        />
      </div>
      <div class="imges">
        <img
          src="..\assets\ralu-gal-G8cB8hY3yvU-unsplash.jpg"
          alt=""
        />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

main {
  display: flex;

  .info {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 50%;
    height: 80vh;

    h1 {
      font-weight: 400;
      font-size: 4rem;
      margin: 0;
      color: #2c3e50;

    }

    h4 {
      font-weight: 500;
      max-width: 90%;
    }
    a {
      text-align: center;
      background-color: #2c3e50;

      background-color: rgb(20, 20, 20);
      padding: 1.5rem;
      color: rgb(248, 239, 227);
      font-size: 1.1rem;
      font-weight: 700;
      text-decoration: none;
      max-width: 10rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

  section {
    position: relative;
    left: 4rem;
    top: 2rem;

    .imges {
      position: absolute;
      @include PictureStyle;

      &:nth-child(1) {
        position: absolute;
        left: 6rem;
        top: 14rem;
        z-index: 2;
      }

      &:nth-child(2) {
        position: absolute;
        left: 13rem;
        top: 3rem;
        z-index: 1;
      }

      &:hover {
        z-index: 1000;
      }

      img {
        width: 100%;
        max-height: 80%;
        height: auto;
        object-fit: cover;
      }
    }

    .imges:hover {
      width: 15rem;
      height: 20rem;
    }
  }
}
</style>