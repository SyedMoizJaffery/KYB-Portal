<template>
  <div class="body">
    <q-page class="flex flex-column items-center justify-center">
      <div class="flex visible-content flex-column justify-center">
        <div class="q-mb-md row">
          <div class="col flex justify-center">
            <img
              src="@/assets/images/frame.png"
              class="q-mr-sm"
              style="width: 41px; height: 38px"
              alt="Custom Icon"
            />

            <div class="header">Researcher Portal</div>
          </div>
        </div>

        <div class="login-card">
          <div class="text-h5 text-center q-mb-md">Set Password</div>
          <div class="text-subtitle2 q-mb-xl">Please enter new password</div>
          <q-form @submit.prevent="onSubmit" class="form-control">
            <q-input
              v-model="password"
              class="q-mb-md"
              borderless
              label="Enter Password"
              :rules="rules"
              :type="isPwd1 ? 'password' : 'text'"
            >
              <template v-slot:label>
                <div class="label">Enter Password</div>
              </template>
              <template v-slot:prepend>
                <q-icon name="key" class="icon-color" />
              </template>
              <template v-slot:append>
                <q-icon
                  class="icon-color cursor-pointer"
                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                  size="1.25rem"
                  @click="isPwd1 = !isPwd1"
                />
              </template>
            </q-input>

            <q-input
              v-model="confirmPassword"
              class="q-mb-md"
              borderless
              label="Enter Confirm Password"
              :rules="[(val) => val === password || 'Password does not match']"
              :type="isPwd2 ? 'password' : 'text'"
            >
              <template v-slot:label>
                <div class="label">Enter Confirm Password</div>
              </template>
              <template v-slot:prepend>
                <q-icon name="key" class="icon-color" />
              </template>
              <template v-slot:append>
                <q-icon
                  class="icon-color cursor-pointer"
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  size="1.25rem"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>

            <Button
              style="max-width: 465px"
              type="submit"
              label="Set Password"
              class="q-mb-md"
            />
          </q-form>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth-store";
import { ref } from "vue";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const confirmPassword = ref("");
const password = ref("");
const rules = [
  (val) =>
    (val && val.length > 8) || "Password must contain at least 8 characters",
  (val) =>
    /[a-z]/.test(val) || "Password must contain at least one lowercase letter",
  (val) =>
    /[A-Z]/.test(val) || "Password must contain at least one uppercase letter",
  (val) => /\d/.test(val) || "Password must contain at least one number",
  (val) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val) ||
    "Password must contain at least one symbol",
];

const isPwd1 = ref(true);
const isPwd2 = ref(true);
const route = useRoute();
const onSubmit = async () => {
  await authStore.setPassword({
    password: password.value,
    confirmPassword: confirmPassword.value,
    token: route.params.token,
  });
};
</script>

<style scoped>
.body {
  background-image: url("@/assets/images/login.jpeg");
  background-size: cover;
  background-position: top;
  height: 100vh;
}
.header {
  font-size: 28.15px;
  font-weight: 600;
  color: var(--q-app-logo-text);
}
.top-content {
  margin-bottom: 20px;
  text-align: center;
}

.top-content q-col {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  max-width: 464px;
}
.login-card {
  background-color: white;
  max-width: 599px;
  width: 100%;
  height: 448px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(146, 145, 145, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-h5 {
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 20px;
  color: var(--q-text-heading);
}

.text-subtitle2 {
  font-family: "Inter", sans-serif;
  color: var(--q-faded-text);
  font-weight: 400;
  font-size: 13px;
  line-height: 15.73px;
}
.q-field:deep(.q-field__inner) {
  border: 2px solid var(--q-app-secondary);
  padding: 0 20px 0 20px;
  border-radius: 8px;
  background: white;
  color: var(--q-text-color) !important;
}
.label {
  color: var(--q-text-color) !important;
}
.icon-color {
  color: var(--q-icon-color);
}

.q-field:deep(
    .q-field__inner .q-field__control .q-field__append .text-negative
  ) {
  display: none;
}

@media (max-width: 631px) {
  .login-card {
    background-color: white;
    width: 100%;
    height: 428px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(146, 145, 145, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out 0.2s;
  }
  .visible-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out 0.2s;
    max-width: 350px;
    width: 100%;
  }
}
</style>
