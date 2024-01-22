<template>
  <!-- <q-btn
        flat
        class="view-history-button text-subtitle2 text-weight-bold q-ml-sm q-mt-sm"
        @click="openModal"
      > -->
  <q-icon
    flat
    class="q-mr-sm history-icon"
    name="history"
    size="20px"
    @click="openModal(props.row)"
  />
  <!-- <span class="create-source-button-text" style="color: var(--q-black)"
          ></span
        >
      </q-btn> -->

  <q-dialog v-model="viewHistory">
    <q-card>
      <q-card-section>
        <p>View History</p>
        <div class="right-column q-pa-md">
          <q-timeline color="secondary">
            <q-timeline-entry heading> Tasks Timeline </q-timeline-entry>

            <q-timeline-entry
              v-for="(entry, index) in timelineEntries"
              :key="index"
            >
              <q-timeline-entry heading v-if="index === 3">
                {{ month }}
              </q-timeline-entry>
              <div class="text-caption text-weight-bold subtitle">
                {{ entry.subtitle }}
              </div>
              <div class="text-h6 text-weight-medium">{{ entry.title }}</div>
              <div class="text-body2 text-weight-medium">
                {{ entry.text }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
  <script setup>
import { getRequest } from "@/helper/http-config";
import { ref, computed, onMounted } from "vue";
import { useSourceStore } from "@/store/source-store";
import { storeToRefs } from "pinia";

const props = defineProps(["showModal"]);
const emit = defineEmits(["closeDialog"]);

const sourceStore = useSourceStore();
const { getSourceId } = storeToRefs(sourceStore);

const createDialog = ref(false);
const options = ref(["Task 1", "Task 2", "Task 3", "Task 4"]);
const selectedOption = ref("");
const numberOfTasks = ref("");
const description = ref("");
const required = (val) => !!val || "Required";
const timelineEntries = ref([]);
const taskCount = ref(0);
const sourceValue = ref();
const viewHistory = ref(false);

const entryDate = new Date();
const currentDate = new Date();
const month = computed(() => {
  if (taskCount.value === 4) {
    if (entryDate.getMonth() === currentDate.getMonth()) {
      return currentDate.toLocaleDateString("en-US", { month: "long" });
    }
  }
  return "";
});

const fetchHistory = () => {
  console.log(getSourceId);
  sourceStore.fetchHistory(getSourceId.value);

  console.log("Source ID:", getSourceId.value);

};

const modalVisible = ref(false);

const openModal = () => {
  sourceValue.value = sourceRow.value;
  modalVisible.value = true;
  console.log(sourceValue.value);
};

const handleEditToggle = () => {
  createDialog.value = false;
  emit("closeDialog");
};

const closeModal = () => {
  viewHistory.value = false;
  emit("closeDialog");
};

onMounted(() => {
  viewHistory.value = props.showModal;
  fetchHistory();
});
</script>
  
  <style scoped>
.view-history-button {
  font-family: "Lato", sans-serif;
  border-radius: 6px;
  background-color: var(--q-btn-bg);
  color: var(--q-btn-text);
}
.left-column {
  height: 100vh;
}
.form-card {
  max-width: 600px;
  width: 100%;
}
.asterik {
  color: red;
}
.subtitle {
  color: var(--q-gray);
}
.history-icon {
  color: black;
}
</style>
  