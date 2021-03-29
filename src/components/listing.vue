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
  </tr>
</template>

<script>
export default {
  props: ["listing"],
  methods: {
    handleClick() {
      this.$emit("claim-lead", this.listing);
    },
  },
  computed: {
    buttonText() {
      return this.listing.leadClaimed ? "Claimed" : "Claim Lead";
    },
    buttonDisabled() {
      return !this.listing.leadClaimed ? null : "disabled";
    },
  },
};
</script>

<style>
.thumbnailPadding {
  margin: 4px;
}
</style>
