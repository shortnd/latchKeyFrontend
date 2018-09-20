<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      kid: {},
    };
  },
  created() {
    axios.get(`http://localhost:3000/kids/${this.$router.params.id}`)
      .then((response) => {
        this.$router.push({
          name: KidInfo,
        });
      })
      .catch((error) => {
        this.errors.push(error);
      });
  },
};
</script>

<style>

</style>
