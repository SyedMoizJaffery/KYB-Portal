<template>
  <div class="body">
    <q-page class="flex flex-column items-center justify-center">
      <div class="flex visible-content flex-column justify-center">
        <div class="row q-mb-xl">
          <div class="col flex justify-center">
            <img
              src="@/assets/images/frame.png"
              class="q-mr-sm"
              style="width: 41px; height: 38px"
              alt="Custom Icon"
            />

            <p class="header">Researcher Portal</p>
          </div>
        </div>
        <div class="q-pa-md login-card">
          <div class="text-h5 text-center q-mb-md q-mt-sm">Forgot Password</div>
          <div class="text-subtitle2 q-mb-xl">
            Please provide the registered email address
          </div>
          <q-form @submit.prevent="onSubmit" class="form-control">
            <InputField
              borderless
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter an email address',
              ]"
              v-model="email"
              label="Enter Email Address"
              class="q-my-md"
              appendIcon=""
              prependIcon="email"
              type="email"
            />

            <Button
              style="max-width: 465px"
              type="submit"
              label="Send email"
            />
          </q-form>
          <div
            class="text-subtitle2 q-mt-xl flex items-center cursor-pointer"
            style="max-width: 464px; width: 100%"
          >
            <router-link
              class="q-pl-xs router-link text-weight-bold"
              style="color: var(--q-text-active) !important"
              to="/"
            >
              <q-icon
                name="west"
                class="icon-color"
                style="font-weight: bold; font-size: 20px"
              /> Back To Login</router-link
            >
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth-store";
import { ref } from "vue";

const email = ref("");

const authStore = useAuthStore();

const onSubmit = () => {
  authStore.forgetPassword({
    email: email.value,
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
  height: 428px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(146, 145, 145, 0.1);
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

  font-weight: 400px;
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

.q-field:deep(.q-field__inner .q-field__control .q-field__append) {
  display: none;
}
.router-link  {
  text-decoration: none !important;
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
