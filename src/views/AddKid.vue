<template>
  <div>
    <form @submit="onSubmit">
      <input type="text" name="name" id="name" v-model.trim="kid.name">
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddKid',
  data() {
    return {
      kid: {},
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios.post('http://localhost:3000/kids/', this.kid)
        .then((response) => {
          this.$router.push({
            name: 'home',
          });
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
};
</script>

<style>

</style>
