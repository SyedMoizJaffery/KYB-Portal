<!-- components/SourceManagement.vue -->
<template>
  <!-- Modal for creating a new source -->
  <q-dialog v-model="createDialog" persistent>
    <q-card class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 card-heading q-ml-sm">Add Source</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="handleEditToggle" />
      </q-card-section>
      <q-separator class="separator" />
      <q-card-section style="max-height: 80vh" class="q-pa-lg scroll">
        <q-form
          class="dialog-form"
          ref="create-source"
          @submit.prevent="submitForm"
        >
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-sm col-md-12 col-lg-12 col-sm-12">
              <div class="card-title q-mb-sm">
                Source URL <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.url"
                  appendIcon=""
                  placeholder="https://www.example.com"
                  prependIcon=""
                  type="url"
                  :rules="[required]"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-sm col-md-6 col-lg-6 col-sm-12">
              <div class="card-title q-mb-sm">
                Authority Name <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.authorityName"
                  appendIcon
                  prependIcon
                  type="text"
                  :rules="[required]"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Region <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  emit-value
                  label="Select"
                  v-model="createSourceObj.regionId"
                  appendIcon
                  prependIcon
                  map-options
                  clearable
                  :option="regions"
                  :rules="[required]"
                  @changeValue="createSourceObj.regionId = $event"
                  popup-content-class="popup-content"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Country <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  multiple
                  use-input
                  input-debounce="0"
                  emit-value
                  map-options
                  clearable
                  label="Select"
                  v-model="createSourceObj.countryId"
                  appendIcon
                  prependIcon
                  :rules="[required]"
                  :display-value="getDisplayValue"
                  :option="options"
                  @changeValue="createSourceObj.countryId = $event"
                  @filter="filterFn"
                  popup-content-class="popup-content"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">State</div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.stateId"
                  emit-value
                  map-options
                  appendIcon
                  prependIcon
                  clearable
                  :option="states"
                  @changeValue="createSourceObj.stateId = $event"
                  popup-content-class="popup-content"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Source Type <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.sourceType"
                  emit-value
                  map-options
                  appendIcon
                  prependIcon
                  clearable
                  :option="sourceTypeOptions"
                  :rules="[required]"
                  @changeValue="createSourceObj.sourceType = $event"
                />
              </div>
            </div>

            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Coverage <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.coverage"
                  appendIcon
                  prependIcon
                  clearable
                  :rules="[required]"
                  :option="coverageOptions"
                  @changeValue="createSourceObj.coverage = $event"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Data Type <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.datatype"
                  appendIcon
                  prependIcon
                  clearable
                  :rules="[required]"
                  :option="dataTypeOptions"
                  @changeValue="createSourceObj.datatype = $event"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">Format</div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  emit-value
                  map-options
                  label="Select"
                  v-model="createSourceObj.format"
                  appendIcon
                  prependIcon
                  clearable
                  :option="formats"
                  @changeValue="createSourceObj.format = $event"
                  popup-content-class="popup-content"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Cost <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  v-model="createSourceObj.cost"
                  label="Select"
                  appendIcon
                  prependIcon
                  clearable
                  :rules="[required]"
                  :option="costOptions"
                  @changeValue="createSourceObj.cost = $event"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">Language</div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  emit-value
                  label="Select"
                  v-model="createSourceObj.language"
                  appendIcon
                  map-options
                  prependIcon
                  clearable
                  :option="languages"
                  @changeValue="createSourceObj.language = $event"
                  popup-content-class="popup-content"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">Portal Range</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.portal_range"
                  appendIcon
                  prependIcon
                  type="text"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Contain UBOs <span class="required-asterisk">*</span>
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.contains_UBOs"
                  appendIcon
                  prependIcon
                  clearable
                  :rules="[required]"
                  :option="containUBOsOptions"
                  @changeValue="createSourceObj.contains_UBOs = $event"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">GDP (US$ Millions)</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.GDP"
                  appendIcon
                  prependIcon
                  type="number"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">
                Integration Status<span
                  v-if="createSourceObj.integrations"
                  class="required-asterisk"
                  >*</span
                >
              </div>
              <div class="card-body">
                <DropDown
                  dense
                  borderless
                  label="Select"
                  v-model="createSourceObj.integration_status"
                  appendIcon
                  prependIcon
                  clearable
                  :option="integrationStatusOptions"
                  :rules="rules"
                  @changeValue="createSourceObj.integration_status = $event"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">Mapping Issues</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.mapping_issues"
                  appendIcon
                  prependIcon
                  type="text"
                />
              </div>
            </div>
            <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
              <div class="card-title q-mb-sm">Integration</div>
              <div class="card-body">
                <q-checkbox
                  dense
                  class="checkbox"
                  v-model="createSourceObj.integrations"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-12 col-lg-12 col-sm-12">
              <div class="card-title q-mb-sm">Keys</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.keys"
                  appendIcon=""
                  prependIcon=""
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-12 col-lg-12 col-sm-12">
              <div class="card-title q-mb-sm">Comments</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.comment"
                  appendIcon=""
                  prependIcon=""
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-md col-md-12 col-lg-12 col-sm-12">
              <div class="card-title q-mb-sm">Tech Comments</div>
              <div class="card-body">
                <InputField
                  dense
                  borderless
                  v-model="createSourceObj.tech_comments"
                  appendIcon=""
                  prependIcon=""
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 q-mb-xs col-md-6 col-lg-6 col-sm-12">
              <div class="card-body"></div>
            </div>
            <div class="col-12 q-mb-xs col-md-6 col-lg-6 col-sm-12">
              <div class="card-body flex justify-end">
                <Button
                  label="Add Source"
                  :loading="loading"
                  style="
                    max-width: 120px;
                    width: 100%;
                    height: 34px;
                    color: var(--q-black) !important;
                  "
                  type="submit"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { useSourceStore } from "@/store/source-store";
import { storeToRefs } from "pinia";
import { postRequest } from "@/helper/http-config";
import { showSnackBar } from "@/helper/index.js";
import ViewHistory from "./ViewHistory.vue"
const sourceStore = useSourceStore();

const { associatedCountries, languages, formats, regions, states } =
  storeToRefs(sourceStore);
import {
  integrationStatusOptions,
  dataTypeOptions,
  coverageOptions,
  costOptions,
  sourceTypeOptions,
  containUBOsOptions,
} from "@/helper/constants";
import ViewHistoryVue from "./ViewHistory.vue";
const props = defineProps(["showModal"]);
const emit = defineEmits(["closeDialog"]);

const options = ref([]);
const createDialog = ref(false);
const createSourceObj = ref({ integrations: false });
const loading = ref(false);

const handleEditToggle = () => {
  createDialog.value = false;
  emit("closeDialog");
};

const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      options.value = associatedCountries.value;
    } else {
      const needle = val.toLowerCase();
      options.value = associatedCountries.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};
const getDisplayValue = computed(() => {
  if (
    !createSourceObj.value.countryId ||
    createSourceObj.value.countryId.length < 1
  )
    return "";
  const first_id = createSourceObj.value.countryId[0];
  const sc = associatedCountries.value.find((c) => c.id == first_id);
  return createSourceObj.value.countryId &&
    createSourceObj.value.countryId.length > 1
    ? `${sc.label} + ${createSourceObj.value.countryId.length - 1} More`
    : sc.label;
});

const rules = computed(() =>
  createSourceObj.value.integrations ? [required.value] : []
);

//Rules
const required = computed(
  () => (val) => !!val || (val && val.length > 0) || "Required"
);
//Api call
const submitForm = () => {
  loading.value = true;

  postRequest("api/source/create-source", createSourceObj.value)
    .then((response) => {
      loading.value = false;
      if (response.status === 200) {
        showSnackBar(true, response?.data?.message);
        sourceStore.getSourceList();
        handleEditToggle();
        error.value = null;
      }
    })
    .catch((error) => {
      loading.value = false;
    });
};

onMounted(() => {
  createDialog.value = props.showModal;
});
</script>

<style scoped>
.q-btn {
  padding: 0px;
}

.q-btn:before {
  box-shadow: none;
}
.create-source {
  max-width: 500px;
}

.source-create-modal {
  width: 100%;
}

.my-card {
  width: 100%;
  max-width: 950px;
}
.required-asterisk {
  color: red;
  margin-left: 1px;
}
.separator {
  margin-left: 24px;
  margin-right: 24px;
}
.card-body {
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-disable);
  word-wrap: break-word;
  max-width: 700px;
  width: 100%;
}
.tooltip-style {
  background: var(--q-text-active);
  font-size: 11px;
  font-weight: 600;
  font-family: "Lato", sans-serif;
}
.dialog-form
  .q-field:deep(
    .q-field__inner .q-field__control .q-field__append .text-negative
  ) {
  display: none;
}
.dialog-form
  .q-field:deep(.q-field__inner .q-field__bottom .q-field__messages div) {
  float: right;
}
</style>
