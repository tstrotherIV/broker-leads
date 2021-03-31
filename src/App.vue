<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Broker Leads</div>
      <v-spacer></v-spacer>
      <router-link
        v-if="(adminUser = true) && user"
        to="/create"
        class="white--text"
      >
        Add Listing
      </router-link>
      <v-btn v-if="user" text @click="signOut"> Sign Out </v-btn>
      <v-btn v-else text @click="signIn"> Sign In </v-btn>
    </v-app-bar>

    <v-main><router-view></router-view> </v-main>
  </v-app>
</template>

<script>
import { db } from "./firebase";
import { mapMutations, mapState } from "vuex";
import { auth, signIn, signOut } from "./firebase";

export default {
  name: "App",

  components: {},
  data() {
    return {
      user: auth.currentUser,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    ...mapMutations(["setListingsData"]),
    signIn() {
      return signIn();
    },
    signOut() {
      signOut();

      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
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
  computed: {
    ...mapState(["adminUser"]),
  },
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
