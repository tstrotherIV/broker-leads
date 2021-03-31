<template>
  <v-container>
    <div v-if="user">
      <listings />
    </div>
    <div v-else>
      <h3>Please Login</h3>
    </div>
  </v-container>
</template>

<script>
import listings from "../components/listings";
import { auth } from "../firebase";

export default {
  components: { listings },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
};
</script>

<style></style>
