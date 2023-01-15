<template>
  <v-card
    :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
    class="ma-5 rounded-xl"
    flat
    ><v-list-item>
      <v-list-item-avatar size="70">
        <v-img :src="coin.image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h6 mx-3"
          >{{
            coin.market_cap_rank +
            ". " +
            coin.name +
            " (" +
            coin.symbol.toUpperCase() +
            ")"
          }}
          <span
            class="font-weight-medium"
            :class="coin.price_change_24h < 0 ? 'red--text' : 'green--text'"
          >
            $ {{ coin.current_price.toFixed(2) }}</span
          ></v-list-item-title
        >

        <v-list-item-subtitle>
          <v-chip class="ma-3">
            Market Cap :
            {{ coin.market_cap }}</v-chip
          >
          <v-chip v-if="!isNaN(parseFloat(coin.total_supply).toFixed(2))">
            Supply :
            {{ parseFloat(coin.total_supply).toFixed(2) }}</v-chip
          ></v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-action>
        <span
          class="font-weight-medium text-h6"
          :class="coin.price_change_24h < 0 ? 'red--text' : 'green--text'"
        >
          <v-icon
            :class="coin.price_change_24h < 0 ? 'red--text' : 'green--text'"
            >{{
              coin.price_change_24h < 0 ? "mdi-chevron-down" : "mdi-chevron-up"
            }}</v-icon
          >
          {{
            showPercent
              ? coin.price_change_percentage_24h.toFixed(2) + "%"
              : coin.price_change_24h.toFixed(2)
          }}</span
        >
      </v-list-item-action>
    </v-list-item></v-card
  >
</template>

<script>
export default {
  components: {},
  props: { coin: Object, showPercent: Boolean },
  data: () => ({}),
};
</script>
