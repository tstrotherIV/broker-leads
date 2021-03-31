<template>
  <tr class="listingRow">
    <td class="text-center">{{ listing.address }}</td>
    <td class="text-center">{{ listing.city }}</td>
    <td class="text-center">{{ listing.state }}</td>
    <td class="text-center">{{ listing.zipcode }}</td>
    <td class="text-center">
      {{ listing.clientFirstName }} {{ listing.clientLastName }}
    </td>
    <td>
      <v-img
        :src="listing.thumbnail"
        alt="home photo"
        max-height="150"
        max-width="250"
        class="thumbnailPadding text-center"
      ></v-img>
    </td>
    <td class="pr-0">
      <v-btn @click="handleClick" :disabled="buttonDisabled">{{
        buttonText
      }}</v-btn>
    </td>
    <td class="pr-0" v-if="adminUser === true">
      <v-btn @click="handleDelete" color="red">Delete</v-btn>
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["listing"],
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("claim-lead", this.listing);
    },
    handleDelete() {
      if (
        confirm(
          "Are you sure you want to Delete this listing? It cannot be recovered after deletion!"
        )
      ) {
        // Save it!
        this.$emit("delete-listing", this.listing);
      } else {
        // Do nothing!
      }
    },
    computed: {
      ...mapState(["adminUser"]),
    },
  },
  computed: {
    buttonText() {
      return this.listing.leadClaimed || this.listing.agentWhoClaimed
        ? "Claimed"
        : "Claim Lead";
    },

    // Admin users are able to reset if the listing is claimed as the button should not be disabled if adminuser logged in
    buttonDisabled(adminUser) {
      return !adminUser
        ? this.listing.leadClaimed || this.listing.agentWhoClaimed
          ? "disabled"
          : null
        : null;
    },
  },
};
</script>

<style>
.thumbnailPadding {
  margin: 4px;
}
</style>
