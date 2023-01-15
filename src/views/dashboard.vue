<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      ><v-icon
        size="35"
        class="mr-2"
        :color="$vuetify.theme.dark ? 'white' : 'black'"
        >{{
          getGreetingData === "Good Evening"
            ? "mdi-moon-waning-crescent"
            : "mdi-white-balance-sunny"
        }}</v-icon
      >{{ getGreetingData }}, User!</v-card-title
    >
    <v-data-iterator
      :items="coinData"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-5 mx-1 transparent" elevation="0">
          <v-flex lg12 xl12>
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              rounded
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field
          ></v-flex>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              rounded
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
              class="ml-3"
            ></v-select>

            <v-btn
              large
              class="ml-3 mr-3"
              rounded
              @click="sortDesc = !sortDesc"
              :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'"
              elevation="0"
            >
              <v-icon>{{
                !sortDesc
                  ? "mdi-sort-alphabetical-descending"
                  : "mdi-sort-alphabetical-ascending"
              }}</v-icon>
            </v-btn>

            <v-btn
              large
              rounded
              @click="isPercent = !isPercent"
              elevation="0"
              :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'"
            >
              <v-icon>{{ !isPercent ? "mdi-percent" : "mdi-numeric" }}</v-icon>
            </v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <div v-for="(coin, index) in props.items" :key="index">
          <coinCard :coin="coin" :showPercent="isPercent" />
        </div>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2 mx-6 ma-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="accent"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="accent darken-1"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="accent darken-1"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import coinCard from "@/components/crypto/coinCard.vue";
import { getCoinData } from "@/services/api";
export default {
  name: "dashboard-component",
  data: () => ({
    itemsPerPageArray: [10, 25, 50],
    search: "",
    sortDesc: true,
    page: 1,
    itemsPerPage: 10,
    sortBy: "Market_Cap",
    keys: ["Name", "Market_Cap", "Total_Supply", "Total_Volume"],
    coinData: [],
    isPercent: true,
    refreshCoinData: undefined,
  }),
  components: { coinCard },
  mounted() {
    this.fetchCoinData();
    this.refreshCoinData = setInterval(this.fetchCoinData, 10000);
    console.log(this.coinData);
  },
  computed: {
    getGreetingData() {
      var today = new Date();
      var curHr = today.getHours();

      return curHr < 12
        ? "Good Morning"
        : curHr > 18
        ? "Good Evening"
        : "Good Afternoon";
    },
    numberOfPages() {
      return Math.ceil(this.coinData.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchCoinData() {
      getCoinData().then((response) => {
        this.coinData = response;
      });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
