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
    <button type="submit" @click.prevent="$emit('onSubmit', collection)">
      Create
    </button>
    <button type="submit" v-show="edeting">Delete</button>
  </form>
</template>

<script>
export default {
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
  },
};
</script>


