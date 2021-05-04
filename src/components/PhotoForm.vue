<template>
  <section>
    <form class="pure-form">
      <h2>Edit Photo</h2>
      <img src="" alt="" />
      <div class="options" @click="flip = false">
        <select value="" @change="selected = photo" class="ui dropdown">
          <option disabled value="">-- Select an album --</option>
          <option
            v-for="(col, index) in collections"
            :value="index"
            :key="index"
          >
            {{ col.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        v-show="inAlbum == undefined"
        @click.prevent="
          inserIntoAlbum(selected);
          exit();
        "
        value="Add"
      >
        Add
      </button>

      <button
        type="submit"
        v-show="inAlbum != undefined"
        @click="removeFromAlbum(index)"
        value="Remove"
      >
        Delete
      </button>
      <button @click.prevent="exit()">Exit</button>
    </form>
  </section>
</template>

<script>
export default {
  components: {},
  name: "PhotoForm",
  props: {
    photo: Object,
    inAlbum: Number,
    photoIdx: Number,
  },
  data() {
    return {
      collections: [],
      selected: "",
    };
  },
  created() {
    this.collections = JSON.parse(localStorage.getItem("collections"));
  },
  methods: {
    inserIntoAlbum(photo) {
      var collection = this.collections[this.album];
      if (collection.pictures) {
        collection.pictures.push(photo);
        this.collections[this.album] = collection;
      } else {
          var newCollection = {
          name: collection.name,
          discription: collection.discription,
          pictures: [photo]
        }
        this.collections[this.album] = newCollection;
      }
      localStorage.setItem("collections", JSON.stringify(this.collections));
      this.album = "";
    },
    removeFromAlbum() {
      var collection = this.collections[this.inAlbum];
      collection.pictures.splice(this.photoIdx, 1);
      this.collections[this.album] = collection;
      localStorage.setItem("collections", JSON.stringify(this.collections));
    },
    exit() {
      this.$parent.edit = false;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

section {
  position: absolute;
  margin: 0;
  left: 0;
  right: 0;

  form {
    position: fixed;
    background: white;
    z-index: 2;
    width: 18vw;
    height: auto;
    border-radius: 20px;
    padding: 1rem;
    button {
      @include btn;
      margin: 1rem 1rem 0 0;
      // margin-right: 1rem;
    }

    h2 {
      font-weight: 400;
      margin: 1rem 0 0 0;
    }

    select {
      @include input;
      background: white;
      width: 100%;
    }
  }
}
</style>