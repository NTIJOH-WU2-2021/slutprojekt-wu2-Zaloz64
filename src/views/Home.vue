<template>
  <h1>Search for diffrent dogs in our collection</h1>

  <section>
    <div class="options">
      <label for="Order">Order</label>
      <select v-model="order" class="ui dropdown">
        <option value="RANDOM">Random</option>
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </select>
    </div>

    <div class="options" id="breed">
      <label for="Breed">Breed</label>
      <select v-model="breed" class="ui dropdown" name="Breed">
        <option value="All">All</option>
        <option
          v-for="(breed, index) in breeds"
          v-bind:key="index"
          value="breed"
        >
          {{ breed }}
        </option>
      </select>
    </div>

    <div class="options">
      <label for="Breed">Type</label>
      <select v-model="type" class="ui dropdown" id="type">
        <option value="gif,jpg,png">Both static and animated</option>
        <option value="jpg,png">Static</option>
        <option value="gif">Animated</option>
      </select>
    </div>
    <button @click="getPages()" class="btn">Search</button>
    <button
      @click="
        clear();
        Breeds();
      "
      class="btn"
    >
      Clear
    </button>
  </section>

  <Photo-collection :photos="dogs"/>

  <button
    class="btn"
    @click="
      page--;
      getPages();
    "
    v-show="searched && page != 1"
  >
    Previose Page
  </button>
  <button
    class="btn"
    @click="
      page++;
      getPages();
    "
    v-show="searched"
  >
    Next Page
  </button>
</template>

// https://semantic-ui.com/modules/dropdown.html ?

<script>
import ApiHelper from "../apiHelper";
import PhotoCollection from '../components/PhotoCollection.vue';


export default {
  components: { PhotoCollection },
  name: "Home",
  data() {
    return {
      breeds: [],
      type: "gif,jpg,png",
      order: "RANDOM",
      breed: "All",
      dogs: [],
      searched: false,
      page: 1,
    };
  },
  created() {
    this.Breeds();
  },
  methods: {
    async getPages() {
      this.dogs = [];
      this.searched = false;
      var data;
      if (this.breed != "All") {
        data = await ApiHelper.getBreed(this.breed);
        console.log(data);
      } else {
        data = await ApiHelper.getPage(this.page, this.order, this.type);
      }
      data.forEach((element) => {
        if (element.breeds[0] == undefined) {
          this.dogs.push({
            url: element.url,
            id: element.id,
            bred_for: "",
            breed_group: "",
            life_span: "",
            name: "Missing information",
            temperament: "",
            height: "",
          });
        } else {
          this.dogs.push({
            url: element.url,
            id: element.id,
            bred_for: element.breeds[0].bred_for,
            breed_group: element.breeds[0].breed_group,
            life_span: element.breeds[0].life_span,
            name: element.breeds[0].name,
            temperament: element.breeds[0].temperament,
            height: element.breeds[0].height.metric,
          });
        }
      });
      this.searched = true;
    },
    async Breeds() {
      var data = await ApiHelper.getAllBreeds();
      data.forEach((element) => {
        this.breeds.push(element.name);
      });
    },
    clear() {
      this.type = "gif,jpg,png";
      this.order = "RANDOM";
      this.breed = "All";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../public/scss/_variables.scss";

h1 {
  margin-top: 2rem;
  font-weight: 400;
}

section {
  display: flex;
  align-items: flex-end;

  .options {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    label {
      padding-bottom: 4px;
    }
    .dropdown {
      background-color: rgb(250, 246, 242);
      padding: 1rem;
      border-color: rgb(197, 197, 197);
    }
  }

  #breed {
    width: 30%;
  }

  #type {
    width: 20vw;
  }
}

.btn {
  @include btn;
  background-color: #2c3e50;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
  height: 50%;

  &:hover {
    background-color: #253546;
  }
}
</style>
