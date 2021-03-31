<template>
  <v-container>
    <h1>Add Listing</h1>
    <form @submit.prevent="saveListing">
      <v-text-field
        filled
        dense
        rounded
        v-model="address"
        label="Street Address"
        required
      ></v-text-field>

      <v-text-field
        filled
        dense
        rounded
        v-model="city"
        label="City"
        required
      ></v-text-field>

      <v-text-field
        filled
        dense
        rounded
        v-model="state"
        label="State"
        required
      ></v-text-field>

      <v-text-field
        filled
        dense
        rounded
        v-model="zipcode"
        label="Zipcode"
        required
      ></v-text-field>

      <v-text-field
        filled
        dense
        rounded
        v-model="clientFirstName"
        label="Client First Name"
        required
      ></v-text-field>

      <v-text-field
        filled
        dense
        rounded
        v-model="clientLastName"
        label="Client Last Name"
        required
      ></v-text-field>

      <input
        accept="image/*"
        label="Home Image/ Thumbnail"
        prepend-icon="mdi-camera"
        show-size
        :rules="rules"
        required
        type="file"
        @change="previewImage"
      />
      <div>
        <p>
          Progress: {{ uploadValue.toFixed() + "%" }}
          <progress id="progress" :value="uploadValue" max="100"></progress>
        </p>
      </div>

      <v-btn class="mr-4" type="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </v-container>
</template>

<script>
import { db, auth, dbStorage } from "../firebase";

export default {
  data: () => ({
    address: "",
    city: "",
    clientFirstName: "",
    clientLastName: "",
    imageData: null,
    thumbnail: null,
    uploadValue: 0,
    zipcode: "",
    state: "",
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "The photo size should be less than 2 MB!",
    ],
  }),

  computed: {},

  methods: {
    submit() {},
    clear() {
      this.address = "";
      this.city = "";
      this.clientFirstName = "";
      this.clientLastName = "";
      this.thumbnail = "";
      this.zipcode = "";
      this.state = "";
      this.imageData = null;
      this.thumbnail = null;
      this.uploadValue = 0;
    },
    async previewImage(event) {
      this.uploadValue = 0;
      this.thumbnail = null;
      this.imageData = event.target.files[0];
      const storageRef = dbStorage
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.thumbnail = url;
          });
        }
      );
    },
    async saveListing() {
      await db.collection("homes").add({
        address: this.address,
        city: this.city,
        clientFirstName: this.clientFirstName,
        clientLastName: this.clientLastName,
        zipcode: this.zipcode,
        state: this.state,
        thumbnail: this.thumbnail,
        leadClaimed: false,
        agentWhoClaimed: null,
        userId: auth.currentUser.uid,
      });
      this.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
