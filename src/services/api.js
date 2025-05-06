import axios from 'axios';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const fetchExchangeRates = async () => {
  try {
    console.log('Fetching exchange rates from:', `${BASE_URL}/latest/USD`);
    const response = await axios.get(`${BASE_URL}/latest/USD`);
    console.log('API Response:', response.data);
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.response ? error.response.data : error.message);
    return null;
  }
};
