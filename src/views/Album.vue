<template>
<section>
  <h1>{{collection.name}}</h1>
  <h4>{{collection.discription}}</h4>
</section>

  <Photo-collection :inAlbum="album" :photos="collection.pictures" />
</template>

<script>
import PhotoCollection from '../components/PhotoCollection.vue';
export default {
  components: { PhotoCollection },
  name: "Album",
  data() {
    return {
      collection: {
        name: "Name",
        discription: "Discription",
        pictures: [],
      },
      album: undefined,
    };
  },
  created() {
    const collections = JSON.parse(localStorage.getItem("collections"));
    this.collection = collections[this.$route.params.id];
    this.album = this.$route.params.id;
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";
@import "../../public/scss/style.css";

section {
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
align-items: center;
  h1 {
    font-weight: 400;
    margin-bottom: 0;
  }
// h4 {

// }
}

</style>

