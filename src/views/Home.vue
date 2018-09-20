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
              <span v-if="kid.time_in !== null">Time In: {{humanTime(kid.time_in)}} </span> <span v-else>Not Checked In</span>
            </td>
            <td>
              <span v-if="kid.time_out !== null">Time Out: {{ humanTime(kid.time_out) }}</span> <span v-else>Not Checked Out</span>
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
      var date = new Date().getTime();
      if (!kid.checked_in) {
        kid.checked_in = true
        kid.time_in = `${date}`
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
        kid.time_out = `${date}`
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
    },
    humanTime(time) {
      var date = new Date(time);
      var humanHours = date.getHours();
      var humanMinutes = date.getMinutes();
      if (humanHours >= 13) {
        humanHours = humanHours - 12;
      }
      if (humanMinutes <= 10) {
        humanMinutes = `0${humanMinutes}`;
      }
      return `${humanHours}:${humanMinutes}`
    },
    totalTime(kidStartTime, kidEndTime) {
      var startTime = new Date(kidStartTime).getTime();
      var endTime = new Date(kidEndTime).getTime();
      var elapse = endTime - startTime;
      var totalTime = new Date(elapse);
    }
  }
};
</script>
