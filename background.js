const axios = require('axios');
const cron = require('node-cron');
const mongoose = require('mongoose');
const Crypto = require('./models/crypto'); 

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const URL = 'https://api.coingecko.com/api/v3/simple/price';
const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        const response = await axios.get(URL, {
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true
            }
        });

        const data = response.data;

        for (const coin of coins) {
            const cryptoData = {
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change
            };

            const cryptoRecord = new Crypto(cryptoData);
            await cryptoRecord.save();
        }

        console.log('Crypto data saved successfully.');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

cron.schedule('0 */2 * * *', fetchCryptoData);

fetchCryptoData();
