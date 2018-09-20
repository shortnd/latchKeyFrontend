<template>
  <div>
    <h2>{{ this.kid.name }}</h2>
    <ul>
      <li>Time in: {{ this.kid.time_in }}</li>
    </ul>
    <router-link :to="`/kids/update/${this.kid._id}`">Update</router-link> |
    <a href="#" @click.stop="removeKid" class="btn">Remove</a>
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
    axios.get(`http://localhost:3000/kids/${this.$route.params.id}`)
      .then((response) => {
        this.kid = response.data;
      })
      .catch((error) => {
        this.erros.push(error);
      });
  },
  methods: {
    removeKid() {
      axios.delete(`http://localhost:3000/kids/${this.$route.params.id}`)
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
