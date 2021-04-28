
<template>
    <h1>Profile</h1>
    <button v-on:click="getBreeds()" >dfjkh</button>

</template>


<script>
import ApiHelper from '../apiHelper';

export default {
    data() { 
        return {
            data: '',
        }
    },
    methods: {
        async getBreeds() {
            await ApiHelper.getDogPage();
        }
    },
}
</script>
