const got = require('got');
const API_KEY = 'ad3e286ea0bb9cc98e58343a';
const endpoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

module.exports.getRates = async (req) => {
    const results = await got(endpoint, {
        responseType: 'json',
    });

    const moneyTypes = {
        'USD': 'US dollars',
        'EUR': 'euros',
        'RUB': 'rubles',
        'GBP': 'pounds',
        'JPY': 'pounds'
    }

    const itemsPrice = req.body || [];

    try {
        const rates = results.body && results.body.conversion_rates;
        let filtred = {};

        for (const currency in rates) {
            if (['USD', 'EUR', 'RUB', 'GBP', 'JPY'].indexOf(currency) > -1) {
                filtred[moneyTypes[currency]] = itemsPrice.reduce((acc, item) => acc+= (item.price * rates[currency]), 0);
            }
        }

        return filtred;
    } catch (err) {
        return err;
    }
};
