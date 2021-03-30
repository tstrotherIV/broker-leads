<template>
  <v-container>
    <v-simple-table fixed-header height="600px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Address</th>
            <th class="text-center">City</th>
            <th class="text-center">State</th>
            <th class="text-center">Zipcode</th>
            <th class="text-center">Client Name</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="listing in current_listings" :key="listing.id">
          <ListingItem :listing="listing" @claim-lead="claimListing"
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
import { db } from "../firebase";

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
      home.leadClaimed = true;
      db.collection("homes").doc(home.id).update({
        leadClaimed: true,
      });
    },
    async deleteListing(home) {
      db.collection("homes").doc(home.id).delete();
    },
  },
};
</script>

<style></style>
