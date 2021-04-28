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
      <select v-if="breeds.length == 1" v-model="breed" class="ui dropdown" name="Breed">
        <option value="All">All</option>
      </select>
      <select v-else v-model="breed" class="ui dropdown" name="Breed">
        <option v-for="(breed, index) in breeds" v-bind:key="index" value="breed">{{breed}}</option>
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
    <button @click="getPages();" class="btn">Search</button>
    <button @click="clear();Breeds()" class="btn">Clear</button>
  </section>

  <main>
    <div
      class="imges"
      v-for="photo in dogs"
      :key="photo.id"
      :class="{ active: flipAnimation(photo.id) }"
      @click="yes(photo.id)"
    >
      <img :src="photo.url" alt="Dog photos" />
      <div class="back">
        <h4>ljsjdhsdfkjhk</h4>
      </div>
    </div>
  </main>
  <button class="btn" @click="page--; getPages()" v-show="searched && page != 1">Previose Page</button>
  <button class="btn" @click="page++; getPages()" v-show="searched">Next Page</button>
</template>

// https://semantic-ui.com/modules/dropdown.html ?

<script>
import ApiHelper from "../apiHelper";

export default {
  name: "Home",
  data() {
    return {
      breeds: ["All"],
      type: "gif,jpg,png",
      order: "RANDOM",
      breed: "All",
      selected: [],
      dogs: [],
      searched: false,
      page: 1,
    };
  },
  // created: {
  //   async getBreed() {
  //     this.Breeds()
  //     console.log(this.Breeds)
  //   }
  // },
  methods: {
    async getPages() {
      this.dogs = []
      this.searched = false;

      var data = await ApiHelper.getPage(this.page, this.order, this.type);
      data.forEach((element) => {
        this.dogs.push({ url: element.url, id: element.id });
        console.log(element.breeds[0])
      });

      this.searched = true;
    },
    async Breeds() {
      var data = await ApiHelper.getAllBreeds();
      data.forEach((element) => {
        this.breeds.push(element.name);
      });
    },
    yes(num) {
      if (this.selected.includes(num)) {
        this.selected.splice(this.selected.indexOf(num), 1);
      } else {
        this.selected.push(num);
      }
    },
    theorder() {
      console.log(this.type)
    },
    clear() {
      this.type = "gif,jpg,png"
      this.order = "RANDOM"
      this.breed = "All"
    },
    flipAnimation(num) {
      if (this.selected.includes(num)) {
        return true;
      } else {
        return false;
      }
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
    }
  }

  .active {
    transform: rotateY(180deg);
  }
}
</style>
