<template>
  <div class="home">
    <h1>This is the homepage</h1>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div v-else-if="kids.length > 0 && !loading">
      <div v-for="kid in kids" :key="kid._id">
        <router-link :to="'/kids/'+kid._id">{{ kid.name }}</router-link> | <span>Time In: {{ kid.time_in }}</span>
      </div>
    </div>
    <div v-else>
      <h2>There are no kids checked in</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      kids: [],
    };
  },
  created() {
    axios.get('http://localhost:3000/kids')
      .then((response) => {
        this.kids = response.data,
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
