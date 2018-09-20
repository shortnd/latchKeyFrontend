<template>
  <div>
    <h2>{{ this.kid.name }}</h2>
    <ul>
      <li>Time in: {{ this.kid.time_in }}</li>
      <li>Time Out: {{ this.kid.time_out }}</li>
      <li>Checked In: {{ this.kid.checked_in }}</li>
    </ul>
    <button @click="updateKid">Update</button> |
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
    updateKid() {
      this.$router.push({
        name: 'UpdateKid',
        params: { id: this.kid._id },
      });
    },
  },
};
</script>

<style>

</style>
