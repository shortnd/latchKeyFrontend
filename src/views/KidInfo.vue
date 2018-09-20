<template>
  <div>
    <h2>{{ this.kid.name }}</h2>
    <ul>
      <li>Time in: {{ humanTime(this.kid.time_in) }}</li>
      <li>Time Out: {{ humanTime(this.kid.time_out) }}</li>
      <li>Checked In: {{ this.kid.checked_in }}</li>
    </ul>
    {{ calculateTotalTime(this.kid.time_in, this.kid.time_out) }}
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
    calculateTotalTime(startTime, endTime) {
      var dateStart = new Date(startTime);
      var dateEnd = new Date(endTime);
      var startTimeCheckin = dateStart.getTime();
      var endTimeCheckin = dateEnd.getTime();
      var totalTime = endTimeCheckin - startTimeCheckin;
      // console.log(new Date(totalTime).getHours()+': '+ new Date(totalTime).getMinutes())
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
    }
  },
};
</script>

<style>

</style>
