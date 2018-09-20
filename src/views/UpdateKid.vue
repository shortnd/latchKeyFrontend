<template>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model.trim="kid.name">
    <label for="time_in">Time In:</label>
    <input v-model="kid.time_in">
    <button @click="now">Now</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      kid: {},
    };
  },
  mounted() {
    axios.get(`http://localhost:3000/kids/${this.$route.params.id}`)
      .then((response) => {
        // this.$router.push({
        //   name: KidInfo,
        // });
        this.kid = response.data;
      })
      .catch((error) => {
        this.errors.push(error);
      });
  },
  methods: {
    now() {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const now = `${hours}:${minutes}`;
      return now;
    },
  },
};
</script>

<style>

</style>
