<template>
  <Photo-form :photo="editFoto" :inAlbum="inAlbum" :photoIdx="editFotoIdx" v-show="edit == true" />

  <main>
    <div
      class="imges"
      v-for="(photo, index) in photos"
      :key="photo.id"
      :class="{ active: flipAnimation(photo.id) }"
      @click="updateSelected(photo.id)"
    >
          <img :src="photo.url" alt="Dog photos" />

      <button
        @click="
          editFoto = photo;
          edit = true;
          editFotoIdx = index;
        "
      >
        +
      </button>
      <div class="back">
        <h2>{{ photo.name }}</h2>
        <p v-show="photo.bred_for != undefined">Breed for: {{ photo.bred_for }}</p>
        <p>Breed group: {{ photo.breed_group }}</p>
        <p>Height: {{ photo.height }}</p>
        <p>Life span: {{ photo.life_span }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import PhotoForm from "../components/PhotoForm.vue";

export default {
  components: { PhotoForm },
  name: "PhotoCollection",
  props: {
    photos: Object,
    inAlbum: Number,
  },
  data() {
    return {
      selected: [],
      album: "",
      editFoto: {},
      editFotoIdx: undefined,
      edit: false,
    };
  },
  methods: {
    flipAnimation(num) {
      if (!this.edit) {
        if (this.selected.includes(num)) {
          return true;
        } else {
          return false;
        }
      }
    },
    updateSelected(num) {
      if (this.selected.includes(num)) {
        this.selected.splice(this.selected.indexOf(num), 1);
      } else {
        this.selected.push(num);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  perspective: 0px;

  .imges {
    @include PictureStyle;
    pointer-events: fill;
    margin: 2rem 0;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.75, 0, 0.85, 1);
    display: flex;
    flex-direction: column;

    &:hover {
      cursor: pointer;
      button {
        display: block;
        @include round-btn;
        align-self: center;
        margin: 1rem;
      }
    }
    // .options {
    //     z-index: 1;
    // }

    img,
    .back {
      position: relative;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }

    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg);
      h2 {
          margin: 1rem;
            font-weight: 400;
      }
      p {
          margin: 0 1rem;
      }
    }


    button {
        display: none;
    }
  }

  .active {
    transform: rotateY(180deg);
  }
}
</style>


