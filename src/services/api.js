import axios from "axios";

const BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const getCoinData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export { getCoinData };
