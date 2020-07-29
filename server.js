const path = require('path');
const express = require('express');
const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html');

const { getRates } = require('./getRates');
app.use(express.static(DIST_DIR));
const PORT = process.env.PORT || 8080;

app.get('/cart', (req, res) => {
    res.sendFile(path.join(DIST_DIR, '/dist/cart.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(DIST_DIR, '/dist/form.html'));
});
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.post('/api/rates', async (req, res, next) => {
    const rates = await getRates();
    res.json(rates);
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});
