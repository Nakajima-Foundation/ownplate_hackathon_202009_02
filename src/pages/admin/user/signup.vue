<template>
  <section class="section">
    <div class="card block">
      <form class="card-content"
        @submit.prevent="onSignup">
        <h2 class="p-big bold">
          {{ $t('admin.registration') }}
        </h2>
        <b-field
          :type="errors.email ? 'is-danger' : 'is-success'"
          :message="errors.email && $t(errors.email[0])"
          :label="$t('admin.email')">
          <b-input
            v-model="email"
            type="email"
            placeholder="Enter email here"
            maxlength="256" />
        </b-field>

        <b-field
          :label="$t('admin.name')">
          <b-input
            v-model="name"
            type="text"
            placeholder="Enter name here"
            maxlength="100" />
        </b-field>

        <b-field
          :type="errors.password ? 'is-danger' : 'is-success'"
          :message="errors.password && $t(errors.password[0])"
          :label="$t('admin.password')">
          <b-input
            v-model="password"
            type="password"
            placeholder="Enter password here"
            maxlength="30"
            password-reveal />
        </b-field>
        <b-field
          :type="errors.confirm ? 'is-danger' : 'is-success'"
          :message="errors.confirm && $t(errors.confirm[0])"
          :label="$t('admin.confirmPassword')">
          <b-input
            v-model="confirmPassword"
            type="password"
            placeholder="Enter confirm password here"
            maxlength="30"
            password-reveal />
        </b-field>

        <b-button>
          {{ $t('button.cancel') }}
        </b-button>
        <b-button
          type="is-primary"
          :disabled="Object.keys(errors).length > 0"
          @click="onSignup"
        >
          {{ $t('button.next') }}
        </b-button>
      </form>
    </div>
  </section>
</template>

<script>
import isEmail from 'validator/lib/isEmail';
import { auth } from "~/plugins/firebase.js";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      emailTaken: "---invalid---"
    };
  },
  computed: {
    errors() {
      let errors = {};
      if (this.password !== this.confirmPassword) {
        errors.confirm = ['admin.error.password.mismatch'];
      }
      if (this.password.length < 6) {
        errors.password = ['admin.error.password.tooshort'];
      }
      if (!isEmail(this.email)) {
        errors.email = ['admin.error.email.invalid'];        
      } else if (this.email === this.emailTaken) {
        errors.email = ['admin.error.email.taken'];        
      }
      return errors;
    },
  },
  methods: {
    async onSignup() {
      const email = this.email; // 
      try {
        let result = await auth.createUserWithEmailAndPassword(this.email, this.password);
        console.log("onSignup success", result)
        this.$router.push("/");
      } catch(error) {
        console.log("onSignup failed", error.code, error.message);
        if (error.code === "auth/email-already-in-use") {
          this.emailTaken = email;
        } else {
          // BUGBUG: Not processing other type of errors
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.tax {
  margin-top: -2rem !important;
}
</style>
