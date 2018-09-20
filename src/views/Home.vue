<template>
  <div class="home">
    <h1>This is the homepage</h1>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div v-else-if="kids.length > 0 && !loading">
      <div>
        <table>
          <tr>
            <th>
              name
            </th>
            <th>
              Time In
            </th>
            <th>
              Time out
            </th>
            <th>
              Checked In
            </th>
          </tr>
          <tr v-for="kid in kids" :key="kid._id">
            <td>
              <router-link :to="'/kids/'+kid._id">{{ kid.name }}</router-link>
            </td>
            <td>
              <span v-if="kid.time_in !== null">Time In: {{ kid.time_in }}</span> <span v-else>Not Checked In</span>
            </td>
            <td>
              <span v-if="kid.time_out !== null">Time Out: {{ kid.time_out }}</span> <span v-else>Not Checked Out</span>
            </td>
            <td>
              <input type="checkbox" v-model="kid.checked_in" @click="checkIn(kid)">
              {{ kid.checked_in }}
            </td>
          </tr>
        </table>
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
  methods: {
    checkIn(kid) {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var humanHours = hours;
      var humanMinutes = minutes;
      if (hours >= 13) {
        humanHours = hours - 12;
      }
      if (minutes <= 10) {
        humanMinutes = `0${minutes}`;
      }
      if (!kid.checked_in) {
        kid.checked_in = true
        kid.time_in = `${humanHours}:${humanMinutes}`
        axios.put(`http://localhost:3000/kids/${kid._id}`, kid)
          .then((response) => {
            this.$router.push({
              name: 'home',
            })
          })
          .catch((error) => {
            console.log(error)
          });
      } else {
        kid.checked_in = false,
        kid.time_out = `${humanHours}:${humanMinutes}`
        axios.put(`http://localhost:3000/kids/${kid._id}`, kid)
          .then((response) => {
            this.$router.push({
              name: 'home',
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
};
</script>
