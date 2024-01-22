<template>
  <q-table
    dense
    bordered
    flat
    title="Treats"
    rows="rows"
    class="source-table"
    columns="columns"
    row-key="name"
    v-model:pagination="pagination"
    virtual-scroll
    :loading="loading"
    separator="cell"
  >
    <template v-slot:top>
      <div class="flex items-center q-my-sm" style="width: 100%">
        <div class="all-sources-title q-mt-sm">Results</div>
        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="isFilterExpand === true ? 'cancel' : 'tune'"
          @click="toggleFilter"
          size="md"
          class="table-header-button q-mt-sm"
        >
          <q-tooltip
            transition-show="jump-up"
            transition-hide="jump-down"
            anchor="top middle"
            self="bottom middle"
            class="tooltip-style"
          >
            Filter
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          dense
          round
          color="white"
          text-color="black"
          @click="handleDuplicates"
          :icon="
            checkDuplicate
              ? `img:${require('../../assets/icons/svg-icons/active-status-change.svg')}`
              : `img:${require('../../assets/icons/svg-icons/status-change.svg')}`
          "
          size="md"
          class="q-mx-sm q-mt-sm"
        >
          <q-tooltip
            transition-show="jump-up"
            transition-hide="jump-down"
            class="tooltip-style"
            anchor="top middle"
            self="bottom middle"
          >
            {{ checkDuplicate ? " Hide" : "Show" }} Duplicate Sources
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          class="create-source-button text-subtitle2 text-weight-bold q-ml-sm q-mt-sm"
          @click="AddSource"
        >
          <img
            src="../../assets/icons/plus.png"
            alt="Add Source"
            class="button-icon"
          />
          <span class="create-source-button-text" style="color: var(--q-black)"
            >Add Source</span
          >
        </q-btn>

        <InputField
          borderless
          dense
          style="width: 100%; max-width: 250px"
          v-model="search"
          debounce="500"
          @update:model-value="handleSearch"
          appendIcon=""
          prependIcon="search"
          class="q-mt-sm q-ml-md"
          label="Search"
          placeholder="By name, url, comment, tech comment"
        >
          <template v-slot:label>
            <div class="label">Search</div>
          </template>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </InputField>
      </div>
      <q-expansion-item
        style="width: 100%; border: none"
        class="expensions-item"
        v-if="isFilterExpand"
        hide-expand-icon
        v-model="isFilterExpand"
      >
        <q-slide-transition>
          <div class="row flex items-center q-ml-md">
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                @changeValue="handleRegion"
                clearable
                class="q-my-md q-mr-sm dropdown-style"
                label="Region"
                v-model="region"
                :option="regionsOptions"
                use-input
                input-debounce="0"
                multiple
                appendIcon=""
                prependIcon=""
                @filter="filterRegions"
                popup-content-class="popup-content"
                :display-value="getRegionValue"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                multiple
                clearable
                input-debounce="0"
                @changeValue="handleCountry"
                class="q-my-md q-mr-sm dropdown-style"
                label="Country"
                v-model="country"
                :option="options"
                use-input
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content"
                @filter="filterFn"
                :display-value="getCountryValue"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                @changeValue="handleFormat"
                class="q-my-md q-mr-sm dropdown-style"
                label="Format"
                :option="formats"
                v-model="format"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="language"
                @changeValue="handleLanguage"
                class="q-my-md q-mr-sm dropdown-style"
                label="Language"
                :option="languages"
                appendIcon=""
                popup-content-class="popup-content"
                prependIcon=""
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="dataType"
                @changeValue="handleDataType"
                class="q-my-md q-mr-sm dropdown-style"
                label="Data Type"
                :option="dataTypeOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="coverage"
                @changeValue="handleCoverage"
                class="q-my-md q-mr-sm dropdown-style"
                label="Coverage"
                :option="coverageOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="integrationCheckbox"
                @changeValue="handleIntegrationCheckbox"
                class="q-my-md q-mr-sm dropdown-style"
                label="Integration"
                :option="integrationOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                @changeValue="handleIntegrationStatus"
                class="q-my-md q-mr-sm dropdown-style"
                label="Integration Status"
                v-model="integrationStatus"
                :option="setIntegrationStatusOptions"
                use-input
                input-debounce="0"
                multiple
                appendIcon=""
                prependIcon=""
                @filter="filterIntegrationStatus"
                popup-content-class="popup-content"
                :display-value="getIntegrationStatusValue"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="cost"
                @changeValue="handleCost"
                class="q-my-md q-mr-sm dropdown-style"
                label="Cost"
                :option="costOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="sourceType"
                @changeValue="handleSourceType"
                class="q-my-md q-mr-sm dropdown-style"
                label="Source Type"
                :option="sourceTypeOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <DropDown
                dense
                borderless
                clearable
                v-model="containsUBOs"
                @changeValue="handleContainsUBOs"
                class="q-my-md q-mr-sm dropdown-style"
                label="Contains UBOs"
                :option="containUBOsOptions"
                appendIcon=""
                prependIcon=""
                popup-content-class="popup-content-filters"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-3">
              <div class="flex justify-between items center">
                <q-btn
                  icon="event"
                  class="q-my-md q-mr-sm text"
                  label="Created At"
                  flat
                >
                  <!-- <img :src="leftIcon2" alt="Left Icon" class="q-mr-sm icons" /> -->
                  <!-- <span class="btn-text"> Created At</span> -->
                  <!-- <img :src="rightIcon2" alt="Right Icon" class="q-ml-sm icon" /> -->
                  <q-menu>
                    <q-date
                      title="Created At"
                      color="grey-9"
                      @update:model-value="handleCreatedAt"
                      range
                    />
                  </q-menu>
                </q-btn>

                <q-btn
                  icon="event"
                  class="q-my-md q-mr-sm text"
                  label="Updated At"
                  flat
                >
                  <!-- <img :src="leftIcon2" alt="Left Icon" class="q-mr-sm icons" /> -->
                  <!-- <span class="btn-text"> Updated At</span> -->
                  <!-- <img :src="rightIcon2" alt="Right Icon" class="q-ml-sm icon" /> -->
                  <q-menu>
                    <q-date
                      title="Updated At"
                      color="grey-9"
                      @update:model-value="handleUpdatedAt"
                      range
                    />
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </div>
        </q-slide-transition>
      </q-expansion-item>
      <div
        class="q-my-md flex items-center"
        v-if="
          createdAt !== '' ||
          updatedAt !== '' ||
          format?.length !== 0 ||
          language?.length !== 0 ||
          search !== '' ||
          coverage !== '' ||
          dataType !== '' ||
          integrationCheckbox !== '' ||
          integrationStatus?.length !== 0 ||
          cost !== '' ||
          sourceType !== '' ||
          containsUBOs !== ''
        "
      >
        Filter:

        <!-- <div class="text-caption q-ma-sm" v-if="country !== ''">
          <q-badge
            v-for="(countryItem, index) in country"
            :key="index"
            class="q-badge q-mx-xs"
          >
            {{ countryItem.label }}
            <q-btn
              class="q-ml-md"
              flat
              round
              size="xs"
              icon="close"
              @click="clearCountry(index)"
            />
          </q-badge>
        </div> -->
        <div class="row">
          <!-- <span class="text-caption q-ma-sm" v-if="region !== ''">
            <q-badge
              v-for="(regionItem, index) in region"
              :key="index"
              class="q-badge q-mx-xs"
            >
              {{ regionItem.label }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearRegion(index)"
              />
            </q-badge>
          </span> -->
          <span class="text-caption q-ma-sm" v-if="search !== ''">
            <q-badge class="q-badge"
              >{{ search }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearSearch"
              />
            </q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="createdAt !== ''">
            <q-badge v-if="createdAt.from" class="q-badge"
              >{{ formatDate(createdAt?.from) }} to
              {{ formatDate(createdAt?.to) }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearCreatedAt"
              />
            </q-badge>
            <q-badge v-else class="q-badge"
              >{{ formatDate(createdAt) }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearCreatedAt"
              />
            </q-badge>
            <!-- <q-badge v-else class="q-badge"
              >{{ formatDate(createdAt) }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearCreatedAt"
              />
            </q-badge> -->
          </span>
          <span class="text-caption q-ma-sm" v-if="updatedAt !== ''">
            <q-badge class="q-badge" v-if="updatedAt.from"
              >{{ formatDate(updatedAt?.from) }} to
              {{ formatDate(updatedAt?.to) }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearUpdatedAt"
              />
            </q-badge>
            <q-badge class="q-badge" v-else
              >{{ formatDate(updatedAt) }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearUpdatedAt"
              />
            </q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="language !== ''">
            <q-badge class="q-badge"
              >{{ language?.label }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearLanguage"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="format !== ''">
            <q-badge class="q-badge"
              >{{ format?.label }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearFormat"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="dataType !== ''">
            <q-badge class="q-badge"
              >{{ dataType }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearDataType"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="coverage !== ''">
            <q-badge class="q-badge"
              >{{ coverage }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearCoverage"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="integrationCheckbox !== ''">
            <q-badge class="q-badge"
              >{{ integrationCheckbox }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearIntegrationCheckbox"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="integrationStatus !== ''">
            <q-badge
              v-for="(item, index) in integrationStatus"
              :key="index"
              class="q-badge q-mx-xs"
            >
              {{ item }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearIntegrationStatus(index)"
              />
            </q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="cost !== ''">
            <q-badge class="q-badge"
              >{{ cost }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearCost"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="containsUBOs !== ''">
            <q-badge class="q-badge"
              >{{ containsUBOs }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearContainsUBO"
            /></q-badge>
          </span>
          <span class="text-caption q-ma-sm" v-if="sourceType !== ''">
            <q-badge class="q-badge"
              >{{ sourceType }}
              <q-btn
                class="q-ml-md"
                flat
                round
                size="xs"
                icon="close"
                @click="clearSourceType"
            /></q-badge>
          </span>
        </div>
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="authorityName" auto-width :props="props">
          <span>
            {{
              props.row.authorityName === ""
                ? "-"
                : shortenText(props.row.authorityName, 48)
            }}

            <q-tooltip
              v-if="props.row.authorityName?.length > 48"
              class="table-tooltip"
              anchor="bottom middle"
              self="top middle"
              max-width="300px"
              transition-hide="scale"
              :offset="[0, 16]"
            >
              <span class="tooltip-text">{{ props.row.authorityName }}</span>
            </q-tooltip>
          </span>
        </q-td>
        <q-td key="url" auto-width :props="props">
          <a target="_blank" :href="`${props.row.url}`">
            {{ props.row.url === "" ? "-" : shortenText(props.row.url, 30) }}

            <q-tooltip
              v-if="props.row.url?.length > 30"
              class="table-tooltip"
              anchor="bottom middle"
              self="top middle"
              max-width="300px"
              transition-hide="scale"
              :offset="[0, 16]"
            >
              <span class="tooltip-text">{{ props.row.url }}</span>
            </q-tooltip>
          </a>
        </q-td>
        <q-td key="region_name" auto-width :props="props">
          {{ props.row.region_name === "" ? "-" : props.row.region_name }}
        </q-td>
        <q-td key="associateCountries" auto-width :props="props">
          <div class="flex column justify-center items-center">
            <div
              class="q-py-xs"
              style="white-space: pre-wrap; word-wrap: break-word"
            >
              {{ props.row.associateCountries.join(", ") }}
            </div>
          </div>
        </q-td>
        <q-td key="state" auto-width :props="props">
          {{ props.row.state === "" ? "-" : props.row.state }}
        </q-td>
        <q-td key="GDP" auto-width :props="props">
          {{ props.row.GDP === "" ? "-" : props.row.GDP }}
        </q-td>
        <q-td key="sourceType" auto-width :props="props">
          {{ props.row.sourceType === "" ? "-" : props.row.sourceType }}
        </q-td>
        <q-td key="coverage" auto-width :props="props">
          {{ props.row.coverage === "" ? "-" : props.row.coverage }}
        </q-td>
        <q-td key="datatype" auto-width :props="props">
          {{ props.row.datatype === "" ? "-" : props.row.datatype }}
        </q-td>
        <q-td key="format" auto-width :props="props">
          {{ props.row.format === "" ? "-" : props.row.format }}
        </q-td>
        <q-td key="cost" auto-width :props="props">
          {{ props.row.cost === "" ? "-" : props.row.cost }}
        </q-td>
        <q-td key="language" auto-width :props="props">
          {{ props.row.language === "" ? "-" : props.row.language }}
        </q-td>
        <q-td key="portal_range" auto-width :props="props">
          {{ props.row.portal_range === "" ? "-" : props.row.portal_range }}
        </q-td>
        <q-td key="contains_UBOs" auto-width :props="props">
          <!-- <q-checkbox
            dense
            class="checkbox"
            disable
            :model-value="props.row.contains_ubos"
          /> -->
          {{ props.row.contains_UBOs === "" ? "-" : props.row.contains_UBOs }}
        </q-td>
        <q-td key="comment" auto-width :props="props">
          <span
            >{{
              props.row.comment === "" || props.row.comment === " "
                ? "-"
                : shortenText(props.row.comment, 30)
            }}

            <q-tooltip
              v-if="
                props.row.comment?.trim() !== '' ||
                props.row.comment?.length > 30
              "
              class="table-tooltip"
              anchor="bottom middle"
              self="top middle"
              max-width="300px"
              transition-hide="scale"
              :offset="[0, 16]"
            >
              <span class="tooltip-text">{{ props.row.comment }}</span>
            </q-tooltip>
          </span>
        </q-td>
        <q-td key="keys" auto-width :props="props">
          <a target="_blank" :href="`${props.row.keys}`">
            {{ props.row.keys === "" ? "-" : shortenText(props.row.keys, 30) }}

            <q-tooltip
              v-if="props.row.keys !== '' || props.row.keys?.length > 30"
              class="table-tooltip"
              anchor="bottom middle"
              self="top middle"
              max-width="300px"
              transition-hide="scale"
              :offset="[0, 16]"
            >
              <span class="tooltip-text">{{ props.row.keys }}</span>
            </q-tooltip>
          </a>
        </q-td>
        <q-td key="mapping_issues" auto-width :props="props">
          {{
            props.row.mapping_issues === "" || props.row.mapping_issues === " "
              ? "-"
              : shortenText(props.row.mapping_issues, 30)
          }}

          <q-tooltip
            v-if="
              props.row.mapping_issues &&
              (props.row.mapping_issues.trim() !== '' ||
                props.row.mapping_issues?.length > 30)
            "
            class="table-tooltip"
            anchor="bottom middle"
            self="top middle"
            max-width="300px"
            transition-hide="scale"
            :offset="[0, 16]"
          >
            <span class="tooltip-text">{{ props.row.mapping_issues }}</span>
          </q-tooltip>
        </q-td>
        <q-td key="integration_status" auto-width :props="props">
          <!-- <q-badge
            :color="
              props.row.integration_status === 'Pending' ? 'red' : 'green'
            "
          > -->
          {{
            props.row.integration_status === ""
              ? "-"
              : props.row.integration_status
          }}
        </q-td>
        <q-td key="tech_comments" auto-width :props="props">
          {{ props.row.tech_comments === "" ? "-" : props.row.tech_comments }}
        </q-td>
        <q-td key="integrations" auto-width :props="props">
          <q-checkbox
            dense
            class="checkbox"
            disable
            :model-value="props.row.integrations"
          />
        </q-td>
        <q-td key="lastUpdatedBy" auto-width :props="props">
          {{ props.row.lastUpdatedBy === "" ? "-" : props.row.lastUpdatedBy }}
        </q-td>
        <q-td key="createdAt" auto-width :props="props">
          {{ formatDate(props.row.createdAt) }}
        </q-td>
        <q-td key="updatedAt" auto-width :props="props">
          {{ formatDate(props.row.updatedAt) }}
        </q-td>
        <!-- <q-td key="editSource" :props="props">
          {{ props.row.editSource }}
        </q-td>
        <q-td key="clickUpTasks" :props="props">
          {{ props.row.clickUpTasks }}
        </q-td> -->
        <q-td key="actions" auto-width :props="props">
          <q-btn
            flat
            round
            color="white"
            text-color="black"
            toggleUser="true"
            size="sm"
            class="nav-link"
            @click="openModal(props.row)"
          >
            <q-icon name="history" style="color: var(--q-text-black)" />
            <q-tooltip
              transition-show="scale"
              class="tooltip-style"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              History
            </q-tooltip>
          </q-btn>
          <!-- <ViewHistory :sourceRow="props.row"/> -->
          <q-btn
            flat
            round
            color="white"
            text-color="black"
            toggleUser="true"
            size="sm"
            :disable="props.row.clickup_task === ''"
            :href="props.row.clickup_task"
            target="_blank"
            class="nav-link"
          >
            <q-icon name="adjust" style="color: var(--q-black-dark)" />
            <q-tooltip
              transition-show="scale"
              class="tooltip-style"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              Click Up Task
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            color="white"
            text-color="black"
            @click="toggleEdit(props.row)"
            size="sm"
            class="nav-link"
            :icon="`img:${require('@/assets/icons/svg-icons/edit.svg')}`"
          >
            <q-tooltip
              transition-show="scale"
              class="tooltip-style"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              Edit Detail
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            color="white"
            text-color="black"
            toggleUser="true"
            size="sm"
            @click="toggleView(props.row)"
            class="nav-link"
            :icon="`img:${require('@/assets/icons/svg-icons/eye.svg')}`"
          >
            <q-tooltip
              transition-show="scale"
              class="tooltip-style"
              style="
                background: var(--q-text-active);
                font-size: 11px;
                font-weight: 600;
                font-family: 'Lato', sans-serif;
              "
              transition-hide="scale"
            >
              View Detail
            </q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:bottom>
      <div
        style="
          font-size: 11px;
          font-weight: 500;
          line-height: 15.4px;
          color: var(--q-text-heading);
        "
      >
        Total Source Count: {{ paginationResult?.totalCount }}
      </div>

      <q-space />
      <span class="text-caption">Rows Per Page: </span>
      <DropDown
        dense
        borderless
        style="border: none"
        @changeValue="handleRowsPerPage"
        v-model="rowsPerPage"
        class="q-mx-sm"
        default
        :option="['20', '25', '50', '100', '150', '250']"
        appendIcon=""
        prependIcon=""
      />
      <span class="text-caption"
        >Page: {{ paginationResult?.currentPage }} of
        {{ paginationResult?.totalPages }}</span
      >
      <q-btn
        icon="first_page"
        color="grey-8"
        round
        dense
        flat
        @click="handlePage(1)"
        :disable="paginationResult?.currentPage === 1 || loading"
      >
        <q-tooltip
          class="tooltip-style"
          max-width="300px"
          transition-hide="scale"
          :offset="[0, 16]"
        >
          <span class="tooltip-text">First Page</span>
        </q-tooltip>
      </q-btn>
      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        @click="handlePage(paginationResult?.currentPage - 1)"
        flat
        :disable="paginationResult?.currentPage === 1 || loading"
      >
        <q-tooltip
          class="tooltip-style"
          max-width="300px"
          transition-hide="scale"
          :offset="[0, 16]"
        >
          <span class="tooltip-text">Previous Page</span>
        </q-tooltip>
      </q-btn>

      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        @click="handlePage(paginationResult?.currentPage + 1)"
        :disable="
          paginationResult?.currentPage === paginationResult?.totalPages ||
          loading
        "
      >
        <q-tooltip
          class="tooltip-style"
          max-width="300px"
          transition-hide="scale"
          :offset="[0, 16]"
        >
          <span class="tooltip-text">Next Page</span>
        </q-tooltip>
      </q-btn>
      <q-btn
        icon="last_page"
        color="grey-8"
        round
        dense
        flat
        @click="handlePage(paginationResult?.totalPages)"
        :disable="
          paginationResult?.currentPage === paginationResult?.totalPages ||
          loading
        "
      >
        <q-tooltip
          class="tooltip-style"
          max-width="300px"
          transition-hide="scale"
          :offset="[0, 16]"
        >
          <span class="tooltip-text">Last Page</span>
        </q-tooltip>
      </q-btn>
    </template>
  </q-table>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { formatDate } from "@/helper/index";
import { storeToRefs } from "pinia";
import { useSourceStore } from "@/store/source-store";
import { getRequest } from "@/helper/http-config";
import ViewHistory from "./ViewHistory.vue";
import {
  integrationStatusOptions,
  dataTypeOptions,
  coverageOptions,
  integrationOptions,
  sourceTypeOptions,
  costOptions,
  containUBOsOptions,
} from "@/helper/constants";

const sourceStore = useSourceStore();

const {
  getPagination,
  loading,
  associatedCountries,
  languages,
  formats,
  regions,
} = storeToRefs(sourceStore);

const leftIcon = ref(require("@/assets/icons/user-opt.png"));
const rightIcon = ref(require("@/assets/icons/vector.png"));
const leftIcon2 = ref(require("@/assets/icons/Calendar.png"));
const rightIcon2 = ref(require("@/assets/icons/vector.png"));

// Filters varibales
const search = ref("");
const region = ref([]);
const country = ref([]);
const createdAt = ref("");
const updatedAt = ref("");
const language = ref("");
const format = ref("");
const dataType = ref("");
const coverage = ref("");
const integrationCheckbox = ref("");
const options = ref([]);
const regionsOptions = ref([]);
const setIntegrationStatusOptions = ref([]);
const integrationStatus = ref([]);
const cost = ref("");
const containsUBOs = ref("");
const sourceType = ref("");
const checkDuplicate = ref(false);

// const countryOptions = ref([]);
// const formatOptions = ref([]);
// const languageOptions = ref([]);
const isFilterExpand = ref(false);
const editToggle = ref(false);
const viewToggle = ref(false);
const rowsPerPage = ref(20);
const modalVisible = ref(false);

defineProps(["columns, rows"]);
const emit = defineEmits(["editData", "addData"]);
const paginationResult = getPagination;

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: paginationResult.value?.currentPage || 1,
  rowsPerPage: 0,
  totalPages: paginationResult.value?.totalPages,
  totalResult: paginationResult.value?.totalCount,
});
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
const filterRegions = (val, update) => {
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

const getCountryValue = computed(() => {
  if (!country.value || country.value?.length < 1) return "";
  const first_id = country.value[0]?.id;
  const sc = associatedCountries.value.find((c) => c.id == first_id);
  return country.value && country.value.length > 1
    ? `${sc?.label} + ${country.value.length - 1} More`
    : sc?.label;
});

const getRegionValue = computed(() => {
  if (!region.value || region.value?.length < 1) return "";
  const first_id = region.value[0]?.id;
  const sc = regions.value.find((c) => c.id == first_id);
  return region.value && region.value.length > 1
    ? `${sc?.label} + ${region.value.length - 1} More`
    : sc?.label;
});

const getIntegrationStatusValue = computed(() => {
  if (!integrationStatus.value || integrationStatus.value?.length < 1)
    return "";
  const first_id = integrationStatus.value[0];
  const sc = integrationStatusOptions.find((c) => c == first_id);
  return integrationStatus.value && integrationStatus.value.length > 1
    ? `${sc} + ${integrationStatus.value.length - 1} More`
    : sc;
});

const filterIntegrationStatus = (val, update) => {
  update(() => {
    if (val === "") {
      setIntegrationStatusOptions.value = integrationStatusOptions;
    } else {
      const needle = val.toLowerCase();
      setIntegrationStatusOptions.value = integrationStatusOptions.filter((b) =>
        b.label.toLowerCase().match(needle)
      );
    }
  });
};

const getAllSources = (pageNumber) => {
  sourceStore.getSourceList(
    search.value || "",
    pageNumber || 1,
    rowsPerPage?.value === "All" ? -1 : rowsPerPage?.value,
    createdAt.value.from && createdAt.value.from !== ""
      ? searchDate(createdAt.value?.from)
      : createdAt.value !== ""
      ? searchDate(createdAt.value)
      : "",
    createdAt.value.from && createdAt.value.from !== ""
      ? searchDate(createdAt.value?.to)
      : createdAt.value !== ""
      ? searchDate(createdAt.value)
      : "",
    updatedAt.value.from && updatedAt.value.from !== ""
      ? searchDate(updatedAt.value?.from)
      : updatedAt.value !== ""
      ? searchDate(updatedAt.value)
      : "",
    updatedAt.value.from && updatedAt.value.from !== ""
      ? searchDate(updatedAt.value?.to)
      : updatedAt.value !== ""
      ? searchDate(updatedAt.value)
      : "",
    country.value?.length === 0
      ? ""
      : JSON.stringify(country.value.map((obj) => obj.id)),
    coverage.value === "" ? "" : coverage.value,
    dataType.value === "" ? "" : dataType.value,
    language.value?.id || "",
    format.value?.id || "",
    integrationCheckbox.value === "Checked"
      ? "true"
      : integrationCheckbox.value === "Un-Checked"
      ? "false"
      : "",
    integrationStatus.value.length === 0
      ? ""
      : JSON.stringify(integrationStatus.value),
    checkDuplicate.value === true ? true : "",
    region.value?.length === 0
      ? ""
      : JSON.stringify(region.value.map((obj) => obj.id)),
    cost.value === "" ? "" : cost.value,
    sourceType.value === "" ? "" : sourceType.value,
    containsUBOs.value === "" ? "" : containsUBOs.value
  );
};

const handlePage = (pageNumber) => {
  getAllSources(pageNumber);
};

const clearSearch = () => {
  search.value = "";
  getAllSources();
};

const clearRegion = (index) => {
  region.value.splice(index, 1);
  handleRegion(region.value);
};
const clearCreatedAt = () => {
  createdAt.value = "";
  getAllSources();
};
const clearUpdatedAt = () => {
  updatedAt.value = "";
  getAllSources();
};
const clearFormat = () => {
  format.value = "";
  getAllSources();
};
const clearCountry = (index) => {
  country.value.splice(index, 1);
  handleCountry(country.value);
};
const clearLanguage = () => {
  language.value = "";
  getAllSources();
};
const clearDataType = () => {
  dataType.value = "";
  getAllSources();
};
const clearCoverage = () => {
  coverage.value = "";
  getAllSources();
};
const clearIntegrationCheckbox = () => {
  integrationCheckbox.value = "";
  getAllSources();
};
const clearIntegrationStatus = (index) => {
  integrationStatus.value.splice(index, 1);
  handleIntegrationStatus(integrationStatus.value);
};
const clearCost = () => {
  cost.value = "";
  getAllSources();
};

const clearSourceType = () => {
  sourceType.value = "";
  getAllSources();
};
const clearContainsUBO = () => {
  containsUBOs.value = "";
  getAllSources();
};
const shortenText = (text, value) => {
  if (text?.length > value) {
    return text.slice(0, value || 20) + "...";
  } else {
    return text;
  }
};

const toggleFilter = () => {
  isFilterExpand.value = !isFilterExpand.value;
};

const searchDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const toggleEdit = (data) => {
  sourceStore.setToggleEdit(true);
  sourceStore.getSource(data);
  emit("editData", data);
};
const AddSource = () => {
  emit("addData");
};
const openModal = (data) => {
  sourceStore.getSource(data);
  emit("viewHistory", data);

  // fetchHistory();
};

const toggleView = (data) => {
  sourceStore.setToggleView(true);
  sourceStore.getSource(data);
};

const handleRowsPerPage = (value) => {
  rowsPerPage.value = value;
  pagination.value.rowsPerPage = value === "All" ? 0 : Number(value);
  getAllSources();
};

// Filters methods
const handleRegion = (value) => {
  region.value = value === null ? [] : value;
  getAllSources();
};
const handleCountry = (value) => {
  country.value = value === null ? [] : value;
  getAllSources();
};

const handleLanguage = (value) => {
  language.value = value === null ? "" : value;
  getAllSources();
};

const handleFormat = (value) => {
  format.value = value === null ? "" : value;
  getAllSources();
};

const handleCreatedAt = (value) => {
  createdAt.value = value;
  getAllSources();
};

const handleUpdatedAt = (value) => {
  updatedAt.value = value;
  getAllSources();
};

const handleSearch = (value) => {
  search.value = value;
  getAllSources();
};

const handleDataType = (value) => {
  dataType.value = value === null ? "" : value;
  getAllSources();
};

const handleCoverage = (value) => {
  coverage.value = value === null ? "" : value;
  getAllSources();
};

const handleIntegrationCheckbox = (value) => {
  integrationCheckbox.value = value === null ? "" : value;
  getAllSources();
};

const handleIntegrationStatus = (value) => {
  integrationStatus.value = value === null ? "" : value;
  getAllSources();
};

const handleDuplicates = () => {
  checkDuplicate.value = !checkDuplicate.value;
  getAllSources();
};

const handleCost = (value) => {
  cost.value = value === null ? "" : value;
  getAllSources();
};

const handleSourceType = (value) => {
  sourceType.value = value === null ? "" : value;
  getAllSources();
};

const handleContainsUBOs = (value) => {
  containsUBOs.value = value === null ? "" : value;
  getAllSources();
};

onMounted(() => {
  pagination.value.rowsPerPage = 20;
  try {
    getAllSources();
    sourceStore.getDropdownData();
  } catch (error) {}
});
</script>

<style>
.label {
  color: var(--q-header-background);
}
.q-badge {
  background: var(--q-text-active);
  font-size: 14px;
}
.table-tooltip {
  background: var(--q-text-disable);
  color: var(--q-white);
}
.tooltip-icon {
  font-size: 16px;
  color: var(--q-text-disable);
}
.tooltip-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.tooltip-style {
  background: var(--q-header-background) !important;
  color: var(--q-black) !important;
  font-size: 11px;
  font-weight: 600;
  font-family: "Lato", sans-serif;
}
/* .dropdown-style {
  width: 100%;
  max-width: 263px;
} */
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
.source-table {
  max-height: 805px;
  height: 100%;
  overflow: auto;
}
.source-table table thead tr th {
  background-color: var(--q-header-background) !important;
  position: sticky;
  top: 0px;
}
.source-table table thead tr th:nth-child(5) {
  min-width: 152px;
  max-width: 200px;
  white-space: break-spaces;
}
.source-table table thead tr th:last-child {
  background-color: white;
  position: sticky;
  right: 0px;
}
.source-table table tbody tr td:last-child {
  background-color: white;
  position: sticky;
  right: 0px;
}
.source-table table thead tr th:first-child {
  background-color: white;
  position: sticky;
  left: 0px;
  z-index: 20;
  border-right: 1px solid var(--q-table-border);
}
.source-table table tbody tr td:first-child {
  background-color: white;
  position: sticky;
  left: 0px;
  z-index: 10;
  border-right: 1px solid var(--q-table-border);
}
.table-header-button {
  color: var(--q-text-disable);
}
.expensions-item > .relative-position .q-item {
  display: none;
}
.source-table table tbody tr td span:hover {
  cursor: pointer;
}
.source-table table tbody tr td {
  max-width: 350px;
  min-width: 150px;
}

.source-table .text {
  text-transform: capitalize;
  color: var(--q-black);
}
.popup-content {
  height: 400px;
  width: 240px;
}
.nav-link .q-icon img {
  width: 19px;
  height: 19px;
}
.nav-link .q-icon {
  font-size: 19px;
}
</style>
