<template>
  <form @submit.prevent="handleRegister">
    <div class="form-group">
      <label>First Name</label>
      <input type="text" name="firstname" required v-model="firstName" />
    </div>
    <div class="form-group">
      <label>Last Name</label>
      <input type="text" name="lastname" v-model="lastName" />
    </div>
    <div class="form-group">
      <label>Username</label>
      <input type="text" name="username" required v-model="username" />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" name="email" required v-model="email" />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" required v-model="password" />
    </div>
    <div class="form-button">
      <button class="button button-primary">Submit</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { kontenbase } from '../lib/kontenbase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleRegister = async () => {
      const { user, error } = await kontenbase.auth.register({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const { error: ErrorProfile } = await kontenbase
        .service('profile')
        .create({
          Users: [user._id],
        });

      if (ErrorProfile) {
        alert(ErrorProfile.message);
        return;
      }

      router.push('/profile');
    };

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      handleRegister,
      handleLogout,
    };
  },
};
</script>
