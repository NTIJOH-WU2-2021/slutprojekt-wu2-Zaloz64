
<template>
  <section>
    <h1>Your library</h1>
    <button
      @click="
        form = !form;
        edit = false;
      "
    >
      +
    </button>
    <Collections-form
      v-show="form"
      :edeting="edit"
      :initialCollection="collection"
      :selected="selected"
      @onSubmit="createCollection"
    />
  </section>
  <main>
    <div
      v-for="(col, index) in collections"
      :key="index"
      class="CollectionContainers"
    >
      <h2>{{ col.name }}</h2>
      <router-link :to="`/album/${index}`">See album</router-link>
      <button
        @click="
          collectionEdit(index);
          edit = true;
          form = !form;
        "
      >
        <img src="../assets/pen.png" alt="" />
      </button>
    </div>
  </main>
</template>


<script>
import CollectionsForm from "../components/CollectionsForm.vue";
// import ApiHelper from '../apiHelper';

export default {
  components: { CollectionsForm },
  data() {
    return {
      data: "",
      form: false,
      edit: false,
      selected: undefined,
      collections: [],
      collection: {
        name: "",
        discription: "",
        pictures: [],
      },
    };
  },
  created() {
    this.collections = JSON.parse(localStorage.getItem("collections"));
  },
  methods: {
    createCollection(collection) {
      let collections = JSON.parse(localStorage.getItem("collections") || "[]");
      collections.push(collection);
      this.collections = collections;
      localStorage.setItem("collections", JSON.stringify(collections));
    },
    collectionEdit(id) {
      this.selected = id;
      const collections = JSON.parse(localStorage.getItem("collections"));
      this.collection = collections[id];
      console.log(this.collection);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

section {
  display: flex;
  align-items: baseline;
  button {
    @include round-btn;
  }
}

main {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .CollectionContainers {
    width: 15rem;
    height: 11rem;
    margin-bottom: 1rem;
    background: white;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #c5c5c5;
    h2 {
      margin-top: 20%;
      margin-bottom: 2rem
    }
    a {
      @include btn;
      font-size: 1rem;
    }

    button {
      display: none;
    }
    &:hover {
      button {
        display: block;
        @include round-btn;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>