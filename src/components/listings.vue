<template>
  <v-container>
    <v-simple-table fixed-header height="600px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">ADDRESS</th>
            <th class="text-center">CITY</th>
            <th class="text-center">STATE</th>
            <th class="text-center">ZIPCODE</th>
            <th class="text-center">CLIENT NAME</th>
            <th class="text-center">IMAGE</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="listing in current_listings" :key="listing.id">
          <ListingItem
            :listing="listing"
            @claim-lead="claimListing"
            @delete-listing="deleteListing"
          />
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListingItem from "./listing.vue";
import { db, auth } from "../firebase";

export default {
  components: { ListingItem },
  data() {
    return {
      claimedListingId: null,
    };
  },
  computed: {
    ...mapState(["current_listings"]),
  },
  methods: {
    async claimListing(home) {
      db.collection("homes")
        .doc(home.id)
        .update({
          leadClaimed: !home.leadClaimed,
          agentWhoClaimed: home.agentWhoClaimed ? "" : auth.currentUser.uid,
        });
    },
    async deleteListing(home) {
      db.collection("homes").doc(home.id).delete();
    },
  },
};
</script>

<style></style>
