
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
  </section>
  <Collections-form
    v-show="form"
    :edeting="edit"
    :initialCollection="collection"
    :selected="selected"
    @onSubmit="createCollection"
  />
  <main>
    
    <div
      v-for="(col, index) in collections"
      :key="index"
      class="CollectionContainers"
    >
      <router-link :to="`/album/${index}`">
        <div class="overlay"></div>
        <div class="imges">
          <div id="container1">
            <img v-if="col.pictures[0]" :src="col.pictures[0].url" alt="" />
          </div>
          <div id="container2">
            <img v-if="col.pictures[1]" :src="col.pictures[1].url" alt="" />
          </div>
          <div id="container3">
            <img v-if="col.pictures[2]" :src="col.pictures[2].url" alt="" />
          </div>
        </div>
        <h2>{{ col.name }}</h2>
      </router-link>
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
    console.log(this.collections);
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

h1 {
  font-weight: 400;
  font-size: 2rem;
}

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
    border-radius: 10px;

    &:hover {
      .overlay {
        background-color: rgba(0, 0, 0, 0.219);
        width: 15rem;
        height: 11rem;
        border-radius: 10px;
        position: absolute;
      }
    }
    a {
    text-decoration: none;
  
    }

    .imges {
      border-radius: 10px;
      height: 100%;
      display: grid;
      grid-template-columns: 70% 30%;
      grid-template-rows: 50% 50%;
      grid-template-areas:
        "one two"
        "one three";
      grid-gap: 1px;

      #container1 {
        background-color: rgb(226, 226, 226);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        grid-area: one;
        img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }

      #container2 {
        background-color: rgb(226, 226, 226);
        border-top-right-radius: 10px;
        grid-area: two;
        img {
          border-top-right-radius: 10px;
        }
      }

      #container3 {
        background-color: rgb(226, 226, 226);
        border-bottom-right-radius: 10px;

        grid-area: three;
        img {
          border-bottom-right-radius: 10px;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h2 {
      font-weight: 400;
      margin: 0.2rem 0 0 0;
      color: black;
    }

    button {
      display: none;
    }
    &:hover {
      button {
        display: block;
        position: relative;
        bottom: 50%;
        @include round-btn;
        z-index: 100;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>