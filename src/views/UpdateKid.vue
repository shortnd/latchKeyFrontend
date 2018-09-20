<template>
  <div>
    <form>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" v-model.trim="kid.name">
      <label for="time_in">Time In:</label>
      <input v-model="kid.time_in">
      <button @click="now">Now</button>
      <button @click="updateKid" type="submit">Update</button>
    </form>
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
        this.kid = response.data;
      })
      .catch((error) => {
        this.errors.push(error);
      });
  },
  methods: {
    now() {
      const time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      console.log(`${hours}:${minutes}`)
      this.kid.time_in = `${hours}:${minutes}`
    },
    updateKid(evt) {
      evt.preventDefault();
      axios.put(`http://localhost:3000/kids/${this.$route.params.id}`, this.kid)
        .then((response) => {
          this.$router.push({
            name: 'home',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>

</style>
