<template>
  <form class="pure-form">
    <fieldset class="pure-group">
      <legend>Collections inforamtion</legend>
      <input type="text" placeholder="Name" v-model="collection.name" />
      <input
        type="text"
        placeholder="Discription"
        v-model="collection.discription"
      />
    </fieldset>
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
    <button type="submit" @click="collectionDelete(selected)" v-show="edeting">
      Delete
    </button>
  </form>
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


