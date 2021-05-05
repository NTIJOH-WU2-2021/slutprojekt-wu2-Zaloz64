<template>
  <div>
    <form class="pure-form">
      <h2 v-show="edeting">Albums inforamtion</h2>
      <h2 v-show="!edeting">Add Album</h2>
      <input type="text" placeholder="Name" v-model="collection.name" />
      <input
        type="text"
        placeholder="Discription"
        v-model="collection.discription"
      />
      <button
        type="submit"
        @click="$emit('onSubmit', collection)"
        v-show="!edeting"
      >
        Create
      </button>
      <button type="submit" @click="editCollection(selected)" v-show="edeting">
        Edit
      </button>
      <button
        type="submit"
        @click="collectionDelete(selected)"
        v-show="edeting"
      >
        Delete
      </button>
      <button type="submit">Exit</button>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  name: "CollectionForm",
  data() {
    return {
      collection: {
        name: this.initialCollection?.name,
        discription: this.initialCollection?.discription,
        pictures: this.initialCollection?.pictures,
      },
    };
  },
  props: {
    initialCollection: Object,
    edeting: Boolean,
    selected: Number,
  },
  watch: {
    initialCollection: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.collection = newVal;
    },
  },
  methods: {
    collectionDelete(id) {
      const collections = JSON.parse(localStorage.getItem("collections"));
      collections.splice(id, 1);
      localStorage.setItem("collections", JSON.stringify(collections));
    },
    editCollection(id) {
      const collections = JSON.parse(localStorage.getItem("collections"));
      collections[id] = this.collection;
      localStorage.setItem("collections", JSON.stringify(collections));
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

div {
  display: flex;
  justify-content: center;
  align-content: center;
    margin: 0;

  form {
    margin: 0;
    position: fixed;
    background: white;
    z-index: 2;
    width: 17rem;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.493);
    button {
      @include btn;
      margin: 1rem 1rem 0 0;
      &:last-child {
        margin-right: 0;
      }
    }

    h2 {
      font-weight: 400;
      margin: 1rem 0 0 0;
    }

    input {
      @include input;
      border-color: rgb(197, 197, 197);
      margin-top: 1rem;
      background: white;
      width: 100%;
      box-sizing:border-box;
    }
  }
}
</style>


