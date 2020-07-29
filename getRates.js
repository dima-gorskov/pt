const got = require('got');
const API_KEY = 'ad3e286ea0bb9cc98e58343a';
const endpoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

module.exports.getRates = async () => {
    const results = await got(endpoint, {
        responseType: 'json',
    });

    try {
        const rates = results.body.conversion_rates;
        let filtred = {};

        for (var currency in rates) {
            if (['USD', 'EUR', 'RUB', 'GBP', 'JPY'].indexOf(currency) > -1) {
                filtred[`"${currency}"`] = `"${rates[currency]}"`;
            }
        }
        return filtred;
    } catch (err) {
        return err;
    }
};
