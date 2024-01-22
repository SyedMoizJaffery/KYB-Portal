<!-- components/UserManagement.vue -->
<template>
  <div class="user-management">
    <!-- Header Section -->
    <div class="header-section">
      <div class="all-users-title">All Users</div>
      <q-btn
        class="create-user-button text-subtitle2 text-weight-bold"
        @click="showModal = true"
        style="font-family: 'Lato', sans-serif; line-height: 16px"
      >
        <img
          src="../../assets/icons/user-plus.png"
          alt="Add User"
          class="button-icon"
        />
        <span class="create-user-button-text" style="color: var(--q-black);">Create New User</span>
        <q-tooltip
              class="tooltip-style"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
              :offset="[0, 16]"
            >
              <span class="tooltip-text">Add New User</span>
            </q-tooltip>
      </q-btn>
    </div>

    <!-- Modal for creating a new user -->
    <q-dialog v-model="showModal" persistent>
      <q-card style="width: 404px">
        <q-card-section class="row items-center q-pb-none">
          <div class="modal-title">Create User</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            class="custom-close-btn"
            @click="
              resetForm();
              showModal = false;
            "
          />
        </q-card-section>

        <q-card-section>
          <div class="input-wrapper">
            <div class="field-heading">
              Full Name <span class="required-asterisk">*</span>
            </div>
            <q-input
              class="custom-inputs"
              borderless
              v-model="userForm.userName"
              placeholder="Enter Full Name"
              dense
              bordered
              :error="isFullNameError"
              :error-message="''"
              no-error-icon
              @blur="validateInputs"
            />
            <div v-if="isFullNameError" class="error-message">
              Please enter the full name
            </div>
          </div>

          <div class="input-wrapper">
            <div class="field-heading">
              Email Address <span class="required-asterisk">*</span>
            </div>
            <q-input
              class="custom-inputs"
              borderless
              v-model="userForm.email"
              placeholder="Enter Email Address"
              type="email"
              dense
              bordered
              :error="isEmailError"
              :error-message="''"
              no-error-icon
              @blur="validateInputs"
            />

            <div v-if="isEmailError" class="error-message">
              Please enter an email address
            </div>
          </div>

          <div class="input-wrapper">
            <div class="field-heading">
              Password <span class="required-asterisk">*</span>
            </div>
            <q-input
              class="custom-inputs"
              borderless
              v-model="userForm.password"
              placeholder="Enter Password"
              type="password"
              dense
              bordered
              :error="isPasswordError"
              :error-message="''"
              no-error-icon
              @blur="validateInputs"
            />
            <div v-if="isPasswordError" class="error-message">
              Enter your password (8 characters long)
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="custom-q-card-actions" align="right">
          <q-btn class="custom-create-btn" flat @click="createUser">
            <span class="create-user-button-text">Create</span>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
      
      <script setup>
import { showSnackBar } from "@/helper/index.js";
import { ref } from "vue";
import {
  QBtn,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QInput,
  QSelect,
  QSpace,
} from "quasar";
import { postRequest } from "@/helper/http-config";

const isFullNameError = ref(false);
const isEmailError = ref(false);
const isPasswordError = ref(false);

const validateInputs = () => {
  isFullNameError.value =
    !userForm.value.userName || userForm.value.userName.length === 0;
  isEmailError.value =
    !userForm.value.email || userForm.value.email.length === 0;
  isPasswordError.value =
    !userForm.value.password || userForm.value.password.length < 8;
};

const resetForm = () => {
  userForm.value = {
    userName: "",
    email: "",
    password: "",
    // role: null, //
  };

  isFullNameError.value = false;
  isEmailError.value = false;
  isPasswordError.value = false;
};

const showModal = ref(false);
const userForm = ref({
  userName: "",
  email: "",
  // role: null,
  password: "",
});
const roleOptions = ["Admin", "Super Admin", "Merchant", "Agent"];

const createUser = async () => {
  try {
    const response = await postRequest("/api/user/create-user", userForm.value);
    resetForm();
  } catch (error) {
    console.error("Error creating user:", error);
  }
  showModal.value = false;
};
</script>
      
      <style scoped>
.required-asterisk {
  color: red;
  margin-left: 1px;
}
.custom-inputs {
  border: 2px solid var(--q-app-secondary);
  height: 44px;
  border-radius: 4px;
  padding-left: 20px;
}
.custom-q-card-actions {
  padding-top: 0px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
}
.custom-create-btn {
  font-family: "Lato", sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  width: 90px;
  height: 34px;
  color: var(--q-btn-modal-text);
  background-color: var(--q-header-background);
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-left: 0px;
  padding-right: 0px;
}

.all-users-title {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 19.2px;
  color: var(--q-text-heading);
}
.create-user-button-text {
  text-transform: capitalize;
  color: var(--q-black);
}
.error-message {
  height: 20px;
  color: rgb(159, 0, 0);
  font-size: 0.85em;
  margin-top: 4px;
}
.input-wrapper {
  margin-bottom: 24px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.custom-close-btn {
  padding: 0px;
  font-size: 11px;
  line-height: 1;
}
.q-field[data-v-985ecd00] .q-field__inner:deep {
  border: 2px solid var(--q-app-secondary);
  padding: 0 0px 0 0px;
  border-radius: 8px;
  background: white;
  color: var(--q-text-color);
}
.field-heading {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-heading);
  margin-bottom: 8px;
  margin-top: 8px;
}

.user-management {
  position: relative;
}

.create-user-modal {
  width: 404px;
  height: 397px;
}

.create-user-button {
  /* position: absolute;
    top: 20px; 
    right: 20px;  */
  width: 160px;
  height: 34px;
  border-radius: 6px;
  background-color: var(--q-btn-bg);
  color: var(--q-btn-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-btn {
  padding: 0px;
}

.q-btn:before {
  box-shadow: none;
}

.button-icon {
  width: 13.37px;
  height: 13px;
  margin-right: 8px;
  
}

.modal-title {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: var(--q-text-heading);
}

.q-my-md {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 80px;
}

.custom-select:deep {
  height: 60px;
}

.custom-option {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-heading);
  padding: 10px;
  margin: 10px;
  /* border-bottom: 1px solid #e0e0e0;  */
}
</style>
      