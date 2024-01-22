div
<template>
  <div class="q-pa-md">
    <SourceTable
      binary-state-sort
      :sort-method="customSort"
      :columns="columns"
      :rows="sourceList"
      @editData="handleEditData"
      @addData="handleAddSource"
      @viewHistory="handleHistoryToggle"
    />
    <SourceHeader
      v-if="createDialog"
      :show-modal="createDialog"
      @closeDialog="handleAddSource"
    />
    <ViewHistory
    v-if="historyDialog"
    :show-modal="historyDialog"
    @closeDialog="handleHistoryToggle"

    />
    <q-dialog v-model="viewDialog">
      <q-card class="view-dialog-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 card-heading q-ml-sm">Source Detail</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="handleViewToggle" />
        </q-card-section>

        <q-separator class="separator" />

        <q-card-section class="q-pa-lg">
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-12 col-lg-12 col-sm-12">
              <div class="card-title">Source URL</div>
              <div class="card-body">
                <a :href="source?.url" target="_blank">{{ source?.url }}</a>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-6 col-lg-6 col-sm-12">
              <div class="card-title">Authority Name</div>
              <div class="card-body">{{ source?.authorityName }}</div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Region</div>
              <div class="card-body">{{ source?.region_name }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Country/State</div>
              <div class="card-body">{{ source?.country }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Source Type</div>
              <div class="card-body">{{ source?.sourceType }}</div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Coverage</div>
              <div class="card-body">{{ source?.coverage }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Data Type</div>
              <div class="card-body">{{ source?.datatype }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Format</div>
              <div class="card-body">
                {{ source.format === "" ? "-" : source?.format }}
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Cost</div>
              <div class="card-body">{{ source?.cost }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Language</div>
              <div class="card-body">{{ source?.language }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Portal Range</div>
              <div class="card-body">{{ source?.portal_range }}</div>
            </div>
          </div>
          <!-- <div class="row q-col-gutter-lg">

          </div> -->
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Contains UBOs</div>
              <div class="card-body">{{ source?.contains_UBOs }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">GDP (US$ Millions)</div>
              <div class="card-body">{{ source?.GDP }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <div class="card-title">Integration Status</div>
              <div class="card-body">{{ source?.integration_status }}</div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-8 col-lg-8 col-sm-12">
              <div class="card-title">Mapping Issues</div>
              <div class="card-body">{{ source?.mapping_issues }}</div>
            </div>
            <div class="col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <!-- <div class="card-title">Integration</div> -->
              <div class="card-body">
                <span class="integration">Integration </span>
                <q-checkbox
                  dense
                  class="checkbox"
                  disable
                  :model-value="source?.integrations"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-12 col-lg-12 col-sm-12">
              <div class="card-title">Keys</div>
              <div class="card-body">
                <a :href="source?.keys" target="_blank">{{ source?.keys }}</a>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-12 col-lg-12 col-sm-12">
              <div class="card-title">Comments</div>
              <div class="card-body">{{ source?.comment }}</div>
            </div>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-lg col-md-12 col-lg-12 col-sm-12">
              <div class="card-title">Tech Comments</div>
              <div class="card-body">{{ source?.tech_comments }}</div>
            </div>
          </div>
          <q-separator />
          <div class="row q-col-gutter-lg">
            <div class="date-parent col-12 q-mb-lg col-md-8 col-lg-8 col-sm-12">
              <!-- <div class="card-title">Created At:</div> -->
              <div class="card-body">
                <span cZlass="date">Created At: </span
                >{{ formatDate(source?.updatedAt) }}
              </div>
            </div>
            <div class="date-parent col-12 q-mb-lg col-md-4 col-lg-4 col-sm-12">
              <!-- <div class="card-title">Updated At:</div> -->
              <div class="card-body">
                <span class="date">Updated At: </span
                >{{ formatDate(source?.updatedAt) }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editToggle" persistent>
      <q-card class="dialog-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 card-heading q-ml-sm">Update Source</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="handleEditToggle" />
        </q-card-section>

        <q-separator class="separator" />

        <q-card-section style="max-height: 80vh" class="q-pa-lg scroll">
          <q-form class="dialog-form" @submit.prevent="onSubmit">
            <div class="row q-col-gutter-lg">
              <div class="col-12 q-mb-md col-md-12 col-lg-12 col-sm-12">
                <div class="card-title q-mb-sm">Source URL</div>
                <div class="card-body">
                  <InputField
                    dense
                    borderless
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    v-model="editSourceData.sourceURL"
                    appendIcon=""
                    prependIcon=""
                    type="url"
                  />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-lg">
              <div class="col-12 q-mb-md col-md-6 col-lg-6 col-sm-12">
                <div class="card-title q-mb-sm">Authority Name</div>
                <div class="card-body">
                  <InputField
                    dense
                    borderless
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    v-model="editSourceData.authorityName"
                    appendIcon=""
                    prependIcon=""
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="row q-col-gutter-lg">
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Region</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    clearable
                    v-model="editSourceData.region"
                    :rules="[
                      (val) => (val && val?.label?.length > 0) || 'Required',
                    ]"
                    :option="regionsOptions"
                    @changeValue="editSourceData.region = $event"
                    use-input
                    input-debounce="0"
                    @filter="regionsFilter"
                    appendIcon=""
                    prependIcon=""
                    popup-content-class="popup-content"
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Country</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    multiple
                    use-input
                    input-debounce="0"
                    map-options
                    clearable
                    :rules="[(val) => (val && val?.length > 0) || 'Required']"
                    v-model="editSourceData.country"
                    :option="countriesOptions"
                    appendIcon=""
                    :display-value="getCountryValue"
                    prependIcon=""
                    @changeValue="editSourceData.country = $event"
                    @filter="countiresFilter"
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
                    clearable
                    use-input
                    input-debounce="0"
                    v-model="editSourceData.state"
                    :option="statesOptions"
                    appendIcon=""
                    prependIcon=""
                    @changeValue="editSourceData.state = $event"
                    popup-content-class="popup-content"
                    @filter="statesFilter"
                  />
                </div>
              </div>
            </div>

            <div class="row q-col-gutter-lg">
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Source Type</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    clearable
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    v-model="editSourceData.sourceType"
                    :option="sourceTypeOptions"
                    @changeValue="editSourceData.sourceType = $event"
                    appendIcon=""
                    prependIcon=""
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Coverage</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    clearable
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    v-model="editSourceData.coverage"
                    :option="coverageOptions"
                    @changeValue="editSourceData.coverage = $event"
                    appendIcon=""
                    prependIcon=""
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Data Type</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    clearable
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    v-model="editSourceData.dataType"
                    :option="dataTypeOptions"
                    @changeValue="editSourceData.dataType = $event"
                    appendIcon=""
                    prependIcon=""
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
                    clearable
                    :option="formatsOptions"
                    v-model="editSourceData.format"
                    @changeValue="editSourceData.format = $event"
                    use-input
                    input-debounce="0"
                    @filter="formatsFilter"
                    appendIcon=""
                    prependIcon=""
                    popup-content-class="popup-content"
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Cost</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    v-model="editSourceData.cost"
                    clearable
                    :option="costOptions"
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    @changeValue="editSourceData.cost = $event"
                    appendIcon=""
                    prependIcon=""
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Language</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    clearable
                    v-model="editSourceData.language"
                    :option="languagesOptions"
                    @changeValue="editSourceData.language = $event"
                    use-input
                    input-debounce="0"
                    @filter="languagesFilter"
                    appendIcon=""
                    prependIcon=""
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
                    v-model="editSourceData.portalRange"
                    appendIcon=""
                    prependIcon=""
                    type="text"
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Contain UBOs</div>
                <div class="card-body">
                  <DropDown
                    dense
                    :rules="[(val) => (val && val.length > 0) || 'Required']"
                    borderless
                    clearable
                    v-model="editSourceData.containsUbos"
                    :option="containUBOsOptions"
                    @changeValue="editSourceData.containsUbos = $event"
                    appendIcon=""
                    prependIcon=""
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">GDP (US$ Millions)</div>
                <div class="card-body">
                  <InputField
                    dense
                    borderless
                    v-model="editSourceData.gdp"
                    appendIcon=""
                    prependIcon=""
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="row q-col-gutter-lg">
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Integration Status</div>
                <div class="card-body">
                  <DropDown
                    dense
                    borderless
                    v-model="editSourceData.integrationStatus"
                    :rules="rules"
                    clearable
                    :option="integrationStatusOptions"
                    @changeValue="editSourceData.integrationStatus = $event"
                    appendIcon=""
                    prependIcon=""
                  />
                </div>
              </div>
              <div class="col-12 q-mb-md col-md-4 col-lg-4 col-sm-12">
                <div class="card-title q-mb-sm">Mapping Issues</div>
                <div class="card-body">
                  <InputField
                    dense
                    borderless
                    v-model="editSourceData.mappingIssues"
                    appendIcon=""
                    prependIcon=""
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
                    v-model="editSourceData.integrations"
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
                    v-model="editSourceData.keys"
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
                    v-model="editSourceData.comments"
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
                    v-model="editSourceData.techComments"
                    appendIcon=""
                    prependIcon=""
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 q-mb-xs col-md-6 col-lg-6 col-sm-12">
                <div class="card-body">
                  <!-- <q-checkbox dense class="checkbox" v-model="integrations" /> -->
                </div>
              </div>
              <div class="col-12 q-mb-xs col-md-6 col-lg-6 col-sm-12">
                <div class="card-body flex justify-end">
                  <Button
                    label="Update"
                    :loading="loading"
                    type="submit"
                    style="max-width: 120px; width: 100%"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useSourceStore } from "@/store/source-store";
import { formatDate, showSnackBar } from "../../helper/index";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import SourceTable from "./SourceTable.vue";
import SourceHeader from "./SourceHeader.vue";
import { patchRequest } from "@/helper/http-config";
import ViewHistory from "./ViewHistory.vue"
import {
  integrationStatusOptions,
  dataTypeOptions,
  coverageOptions,
  integrationOptions,
  costOptions,
  sourceTypeOptions,
  containUBOsOptions,
} from "@/helper/constants";

const sourceStore = useSourceStore();
const {
  sourceList,
  getList,
  getPagination,
  viewDialog,
  source,
  editToggle,
  associatedCountries,
  languages,
  formats,
  regions,
  states,
} = storeToRefs(sourceStore);

const editSourceData = ref({
  authorityName: "",
  sourceURL: "",
  country: "",
  state: "",
  region: "",
  gdp: "",
  sourceType: "",
  coverage: "",
  dataType: "",
  format: "",
  cost: "",
  language: "",
  portalRange: "",
  containsUbos: "",
  comments: "",
  keys: "",
  mappingIssues: "",
  integrationStatus: "",
  techComments: "",
  integrations: "",
});

const countriesOptions = ref([]);
const regionsOptions = ref([]);
const formatsOptions = ref([]);
const languagesOptions = ref([]);
const statesOptions = ref([]);
const createDialog = ref(false);
const historyDialog = ref(false);
const loading = ref(false);
const handleViewToggle = () => {
  sourceStore.setToggleView(false);
};

const handleEditToggle = () => {
  sourceStore.setToggleEdit(false);
};
const handleAddSource = () => {
  createDialog.value = !createDialog.value;
};
const handleHistoryToggle = ( data) => {
  console.log(data)
  historyDialog.value =!historyDialog.value;

}

const countiresFilter = (val, update) => {
  update(() => {
    if (val === "") {
      countriesOptions.value = associatedCountries.value;
    } else {
      const needle = val.toLowerCase();
      countriesOptions.value = associatedCountries.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const regionsFilter = (val, update) => {
  update(() => {
    if (val === "") {
      regionsOptions.value = regions.value;
    } else {
      const needle = val.toLowerCase();
      regionsOptions.value = regions.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const languagesFilter = (val, update) => {
  update(() => {
    if (val === "") {
      languagesOptions.value = languages.value;
    } else {
      const needle = val.toLowerCase();
      languagesOptions.value = languages.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const formatsFilter = (val, update) => {
  update(() => {
    if (val === "") {
      formatsOptions.value = formats.value;
    } else {
      const needle = val.toLowerCase();
      formatsOptions.value = formats.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const statesFilter = (val, update) => {
  update(() => {
    if (val === "") {
      statesOptions.value = states.value;
    } else {
      const needle = val.toLowerCase();
      statesOptions.value = states.value.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const handleEditData = (data) => {
  const newAssociatedcountries = associatedCountries.value.filter((value) => {
    if (data.associateCountries.includes(value.label)) {
      return value;
    }
  });

  let newLanguage;
  if (data.language === null || data.language === "") {
    newLanguage = "";
  } else {
    languages.value.filter((value) => {
      if (data.language.includes(value.label)) {
        newLanguage = value;
      }
    });
  }

  let newFormat;
  if (data.format === null || data.format === "") {
    newFormat = "";
  } else {
    formats.value.filter((value) => {
      if (data.format.includes(value.label)) {
        newFormat = value;
      }
    });
  }

  let newState;
  states.value.filter((value) => {
    if (data.state.includes(value.label)) {
      newState = value;
    }
  });

  editSourceData.value.sourceId = data.id;
  editSourceData.value.authorityName = data.authorityName;
  editSourceData.value.sourceURL = data.url;
  editSourceData.value.country = newAssociatedcountries;
  editSourceData.value.region = {
    label: data.region_name,
    id: data.region_id,
  };
  editSourceData.value.gdp = data.GDP;
  editSourceData.value.state = newState;
  editSourceData.value.sourceType = data.sourceType;
  editSourceData.value.coverage = data.coverage;
  editSourceData.value.dataType = data.datatype;
  editSourceData.value.format = newFormat;
  editSourceData.value.cost = data.cost;
  editSourceData.value.language = newLanguage;
  editSourceData.value.portalRange = data.portal_range;
  editSourceData.value.containsUbos = data.contains_UBOs;
  editSourceData.value.comments = data.comment;
  editSourceData.value.keys = data.keys;
  editSourceData.value.mappingIssues = data.mapping_issues;
  editSourceData.value.integrationStatus = data.integration_status;
  editSourceData.value.techComments = data.tech_comments;
  editSourceData.value.integrations = data.integrations;
};

const rules = computed(() =>
  editSourceData.value.integrations ? [required.value] : []
);

const required = computed(() => (val) => (val && val.length > 0) || "Required");

const columns = [
  {
    name: "authorityName",
    required: true,
    label: "Authority Name",
    field: "authorityName",
    align: "left",
    sortable: true,
  },
  {
    name: "url",
    align: "left",
    label: "Source URL",
    field: "url",
    sortable: true,
  },
  {
    name: "region_name",
    label: "Region",
    align: "left",
    field: "region_name",
    sortable: true,
  },
  {
    name: "associateCountries",
    label: "Country",
    align: "center",
    field: "associateCountries",
    sortable: true,
  },
  {
    name: "state",
    label: "State",
    align: "center",
    field: "state",
    sortable: true,
  },

  {
    name: "GDP",
    label: `GDP - Most Recent Value
    (US$ Millions)`,
    align: "center",
    field: "GDP",
    sortable: true,
  },
  {
    name: "sourceType",
    label: "Source Type",
    align: "center",
    field: "sourceType",
    sortable: true,
  },
  {
    name: "coverage",
    label: "Coverage",
    align: "center",
    field: "coverage",
    sortable: true,
  },
  {
    name: "datatype",
    label: "Data Type",
    align: "center",
    field: "datatype",
    sortable: true,
  },
  {
    name: "format",
    label: "Format",
    align: "center",
    field: "format",
    sortable: true,
  },
  {
    name: "cost",
    label: "Cost",
    align: "center",
    field: "cost",
    sortable: true,
  },
  {
    name: "language",
    label: "Language",
    align: "center",
    field: "language",
    sortable: true,
  },
  {
    name: "portal_range",
    label: "Portal Range",
    align: "left",
    field: "portal_range",
    sortable: true,
  },
  {
    name: "contains_UBOs",
    label: "Contains UBOs",
    align: "center",
    field: "contains_UBOs",
    sortable: true,
  },
  {
    name: "comment",
    label: "Comments",
    align: "left",
    field: "comment",
    sortable: true,
  },
  {
    name: "keys",
    label: "Keys",
    align: "left",
    field: "keys",
    sortable: true,
  },
  {
    name: "mapping_issues",
    label: "Mapping Issues",
    align: "left",
    field: "mapping_issues",
    sortable: true,
  },
  {
    name: "integration_status",
    label: "Integration Status",
    align: "center",
    field: "integration_status",
    sortable: true,
  },
  {
    name: "tech_comments",
    label: "Tech Comments",
    align: "center",
    field: "tech_comments",
    sortable: true,
  },
  {
    name: "integrations",
    label: "Integration",
    align: "center",
    field: "integration",
    sortable: true,
  },
  // {
  //   name: "category",
  //   label: "Category",
  //   align: "left",
  //   field: "category",
  // },

  // {
  //   name: "lastUpdatedBy",
  //   label: "Last Updated By",
  //   align: "left",
  //   field: "lastUpdatedBy",
  // },
  {
    name: "createdAt",
    label: "Created At",
    align: "center",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "updatedAt",
    label: "Updated At",
    align: "center",
    field: "updatedAt",
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "actions",
  },
];

const customSort = (rows, sortBy, descending) => {
  const data = [...rows];

  if (sortBy) {
    data.sort((a, b) => {
      const x = descending ? b : a;
      const y = descending ? a : b;
      if (sortBy == "GDP") {
        return parseInt(x[sortBy], 10) - parseInt(y[sortBy], 10);
      } else {
        return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
      }
    });
  }

  return data;
};

const onSubmit = () => {
  loading.value = true;
  const payload = {
    id: editSourceData.value.sourceId,
    authorityName: editSourceData.value.authorityName,
    url: editSourceData.value.sourceURL,
    countryId: editSourceData.value.country.map((obj) => obj.id), //associated Countries
    regionId:
      editSourceData.value.region === null
        ? ""
        : editSourceData.value.region?.id,
    stateId:
      editSourceData.value.state === null ? "" : editSourceData.value.state?.id,
    GDP: editSourceData.value.gdp,
    format: editSourceData.value.format?.id,
    datatype: editSourceData.value.dataType,
    coverage: editSourceData.value.coverage,
    sourceType: editSourceData.value.sourceType,
    cost: editSourceData.value.cost,
    comment: editSourceData.value.comments || "",
    language: editSourceData.value.language?.id,
    portal_range: editSourceData.value.portalRange,
    contains_UBOs: editSourceData.value.containsUbos,
    keys: editSourceData.value.keys,
    mapping_issues: editSourceData.value.mappingIssues,
    integration_status:
      editSourceData.value.integrationStatus === null
        ? ""
        : editSourceData.value.integrationStatus,
    tech_comments: editSourceData.value.techComments,
    integrations: editSourceData.value.integrations,
  };
  patchRequest("/api/source/update-source", payload)
    .then((response) => {
      loading.value = false;

      showSnackBar(true, response?.data?.message);
      sourceStore.getSourceList();
      handleEditToggle();
    })
    .catch((error) => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const getCountryValue = computed(() => {
  if (!editSourceData.value.country || editSourceData.value.country?.length < 1)
    return "";
  const first_id = editSourceData.value?.country[0]?.id;
  const sc = associatedCountries.value.find((c) => c.id == first_id);
  return editSourceData.value.country && editSourceData.value.country.length > 1
    ? `${sc?.label} + ${editSourceData.value.country.length - 1} More`
    : sc?.label;
});
</script>

<style scoped>
@import "../../assets/style/button.css";

.card-heading {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: var(--q-text-heading);
}

.card-title {
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-heading);
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
.dialog-card {
  max-width: 950px;
  width: 100%;
}
.view-dialog-card {
  max-width: 700px;
  width: 100%;
}
.dialog-edit-card {
  max-width: 680px;
  width: 100%;
}
.date {
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-heading);
}
.date-parent {
  margin-bottom: 0px;
  margin-top: 16px;
}
.integration {
  font-weight: 500;
  font-size: 13px;
  line-height: 15.6px;
  color: var(--q-text-heading);
}
.separator {
  margin-left: 24px;
  margin-right: 24px;
}
.dropdown-style
  > .q-field__inner
  .q-field__control
  .q-field__control-container
  .q-field__native
  span {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 12px;
}
.dialog-form
  .q-field
  :deep(.q-field__inner .q-field__control .q-field__append .text-negative) {
  display: none;
}
.dialog-form
  .q-field:deep(.q-field__inner .q-field__bottom .q-field__messages div) {
  float: right;
}
</style>
