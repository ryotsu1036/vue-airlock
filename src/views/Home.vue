<template>
  <div class="home">
    <h1>This is an home page</h1>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://airlock.test:8000";

export default {
  mounted() {
    axios.get("/api/user").then(response => {
      console.log(response);
    });
  }
};
</script>
