<template>
  <div class="profile-page">
    <div class="button-top">
      <router-link class="button" :to="username">View Profile</router-link>
      <button @click="handleLogout">Logout</button>
    </div>
    <div class="profile-wrapper">
      <div class="profile-header">
        <label class="label-file" htmlFor="file">
          <img
            class="image-avatar"
            width="90"
            height="90"
            :src="image || 'https://via.placeholder.com/90'"
            alt=""
          />
          <span v-if="loading">Uploading...</span>
          <span v-else="loading">Change Image</span>
        </label>
        <input
          name="file"
          id="file"
          type="file"
          accept="image/*"
          @change="handleChangeImage"
        />
      </div>
      <div class="card">
        <form method="post" @submit.prevent="handleUpdate">
          <div class="card-field">
            <label>First Name</label>
            <input type="text" name="firstname" v-model="firstName" />
          </div>
          <div class="card-field">
            <label>Last Name</label>
            <input type="text" name="lastname" v-model="lastName" />
          </div>
          <div class="card-field">
            <label>Phone Number</label>
            <input type="text" name="phonenumber" v-model="phoneNumber" />
          </div>
          <div class="card-field">
            <label>Company</label>
            <input type="text" name="company" v-model="company" />
          </div>
          <div class="card-field">
            <label>Position</label>
            <input type="text" name="position" v-model="position" />
          </div>
          <div class="card-field">
            <label>Location</label>
            <input type="text" name="location" v-model="location" />
          </div>
          <div class="card-field">
            <label>Website</label>
            <input type="url" name="website" v-model="website" />
          </div>
          <div class="form-button">
            <button type="submit" class="button button-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { kontenbase } from '../lib/kontenbase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const firstName = ref('');
    const lastName = ref('');
    const phoneNumber = ref('');
    const username = ref('');
    const profileId = ref('');
    const image = ref('');
    const company = ref('');
    const position = ref('');
    const location = ref('');
    const website = ref('');
    const loading = ref(false);

    const getProfile = async () => {
      const { user, error } = await kontenbase.auth.user({
        lookup: '*',
      });

      if (error) {
        console.log(error);
        return;
      }

      if (user) {
        const profile = user?.profile?.[0];

        firstName.value = user.firstName;
        lastName.value = user.lastName;
        phoneNumber.value = user.phoneNumber;
        username.value = user.username;
        profileId.value = profile._id;
        image.value = profile.image;
        company.value = profile.company;
        location.value = profile.location;
        position.value = profile.position;
        website.value = profile.website;
      }
    };

    const handleChangeImage = async (e) => {
      loading.value = true;
      const file = e.target.files[0];
      const { data, error: uploadError } = await kontenbase.storage.upload(
        file
      );

      const { error: updateError } = await kontenbase
        .service('profile')
        .updateById(profileId.value, {
          image: data?.url,
        });

      if (uploadError || updateError) {
        alert('Failed to change image profile');
        return;
      }

      image.value = data?.url;
      loading.value = false;
    };

    const handleUpdate = async () => {
      const { error: userError } = await kontenbase.auth.update({
        lastName: lastName.value,
        firstName: firstName.value,
        phoneNumber: phoneNumber.value,
      });
      const { error: profileError } = await kontenbase
        .service('profile')
        .updateById(profileId.value, {
          company: company.value,
          location: location.value,
          position: position.value,
          website: website.value,
        });

      if (userError || profileError) {
        alert('Failed to update profile');
      } else {
        alert('Profile updated!');
      }
    };

    const handleLogout = async () => {
      const { error } = await kontenbase.auth.logout();

      if (error) {
        console.log(error);
        return;
      }

      router.push('/');
    };

    onMounted(() => {
      getProfile();
    });

    return {
      firstName,
      lastName,
      phoneNumber,
      username,
      profileId,
      image,
      company,
      location,
      position,
      website,
      loading,
      handleChangeImage,
      handleUpdate,
      handleLogout,
    };
  },
};
</script>
