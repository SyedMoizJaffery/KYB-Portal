<template>
    <div class="calendar-modal">
      <div class="header">
        <div class="dropdown">
          <button
            class="dropdown-btn"
            :style="{ borderColor: '#9BA2FF', borderBottom: 'none' }"
          >
            {{ selectedMonth }}
            <img
              src="@/assets/icons/vector-image.png"
              alt="Dropdown Icon"
              class="icons"
            />
          </button>
          <div class="dropdown-content">
            <div
              class="dropdown-option"
              v-for="month in months"
              :key="month"
              @click="selectMonth(month)"
            >
              {{ month }}
            </div>
          </div>
        </div>
  
        <div class="dropdown">
          <button
            class="dropdown-btn"
            :style="{ borderColor: '#9BA2FF', borderBottom: 'none' }"
          >
            {{ selectedYear }}
            <img
              src="@/assets/icons/vector-image.png"
              alt="Dropdown Icon"
              class="icons"
            />
          </button>
          <div class="dropdown-content">
            <div
              class="dropdown-option"
              v-for="year in reversedYears"
              :key="year"
              @click="selectYear(year)"
            >
              {{ year }}
            </div>
          </div>
        </div>
        <div class="close-icon" @click="closeModal">
          <img
            src="@/assets/icons/cross-icon.png"
            alt="Close Icon"
            class="icon"
          />
        </div>
      </div>
      <div class="divider">Mon Tue Wed Thu Fri Sat Sun</div>
    </div>
  </template>
  
  <style scoped>
    .calendar-modal {
      max-width: 100%;
      width: 276px;
      height: 298px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    .header {
      font-family: "Lato", sans-serif;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #9ba2ff;
    }
  
    .dropdown {
      position: relative;
      margin-bottom: 10px;
      flex: 1 0 100%;
    }
  
    .dropdown-btn {
      width: 100%;
      padding: 5px;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
    }
  
    .icons {
      width: 6px;
      height: 3.5px;
    }
  
    .icon {
      width: 8px;
      height: 8px;
    }
  
    .dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      display: none;
      background-color: #fff;
      box-shadow: 0 4px 9px rgba(53, 46, 44, 0.12);
      border: 1px solid var(--q-dropdown-border);
      border-radius: 4px;
      max-height: 100px;
      overflow-y: auto;
      width: 100%;
  
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
    }
  
    .dropdown-content::-webkit-scrollbar {
      width: 6px;
    }
  
    .dropdown-content::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  
    .dropdown-content::-webkit-scrollbar-track {
      background-color: transparent;
    }
  
    .dropdown-option {
      padding: 8px;
      cursor: pointer;
      width: 100%;
    }
  
    .dropdown-btn:hover {
      background-color: #f9f9f9;
    }
  
    .dropdown:hover .dropdown-content {
      display: block;
    }
  
    .divider {
    background-color: #5d5fec;
    border-radius: 4px;
    width: 242px;
    height: 22px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
    opacity: 5%;
  }

  .divider-text {
    color: #484964;
    font-family: "Lato", sans-serif;
    font-size: 10px;
    font-weight: 600;
    opacity: 100%;
  }
  
    .close-icon {
      cursor: pointer;
    }
  
    @media (min-width: 600px) {
      .header {
        flex-wrap: nowrap;
      }
  
      .dropdown {
        flex: 1 0 auto;
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
  </style>
  
  <script setup>
    import { ref } from "vue";
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const years = Array.from({ length: 25 }, (_, index) => 2024 - index);
    const reversedYears = years.slice().reverse();
  
    const selectedMonth = ref(months[new Date().getMonth()]);
    const selectedYear = ref(new Date().getFullYear());
  
    const selectMonth = (month) => {
      selectedMonth.value = month;
    };
  
    const selectYear = (year) => {
      selectedYear.value = year;
    };
  
    const closeModal = () => {};
  </script>
  