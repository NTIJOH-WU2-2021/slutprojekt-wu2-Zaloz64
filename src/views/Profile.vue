
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
      :initialCustomer="collection"
      @onSubmit="createCollection"
    />
  </section>
  <main>
    <div
      v-for="(col, index) in collections"
      :key="index"
      @click="collectionEdit(index)"
      class="CollectionContainers"
    >
      <h2>{{ col.name }}</h2>
      <button
        @click="
          edit = true;
          form = !form;
        "
      >
        Redigera
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
      collections: [],
      collection: {
        name: "Name",
        discription: "Discription",
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
      const collections = JSON.parse(localStorage.getItem("collections"));
      this.collection = collections[id];
      console.log(collections[id]);
    },
    collectionDelete(id) {
      const customers = JSON.parse(localStorage.getItem("customers"));
      customers.splice(id, 1);
      localStorage.setItem("customers", JSON.stringify(customers));
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .CollectionContainers {
    width: 15rem;
    height: 10rem;
    margin-bottom: 1rem;
    background: white;
    text-align: center;
    h2 {
      margin-top: 20%;
    }

    button {
      display: none;
    }
    &:hover {
      button {
        display: block;
        @include round-btn;

      }
    }
  }
}
</style>