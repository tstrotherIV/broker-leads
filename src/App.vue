<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Broker Leads</div>
      <v-spacer></v-spacer>
      <router-link to="/create" class="white--text"> Add Listing </router-link>
    </v-app-bar>

    <v-main><router-view></router-view> </v-main>
  </v-app>
</template>

<script>
import { db } from "./firebase";
import { mapMutations } from "vuex";

export default {
  name: "App",

  components: {},
  methods: {
    ...mapMutations(["setListingsData"]),
  },
  created() {
    db.collection("homes").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      this.setListingsData(data);
    });
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  color: rgb(255, 200, 100);
}
</style>
