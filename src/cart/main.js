const items = document.querySelectorAll('.cart__list-item-price');
const itemsTotalPrice = document.querySelectorAll('.cart__list-item-total-price');

window.addEventListener('load', e => {
    console.log('*****');
    console.log('Отправляем данные на сервер')
    console.log(getBasePrice(items));
    console.log('*****');
    fetch('/api/rates', { 
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getBasePrice(items))
    })
        .then(res =>  res.json())
        .then(data => {
            console.log('*****');
            console.log('Полученные данные с сервера')
            console.log(JSON.stringify(data, null, 2));
            console.log('*****');
            itemsTotalPrice.forEach(item => {
                item.innerHTML = '';
                for (let totalSum in data) {
                    item.innerHTML += `<span>${totalSum} &ndash; ${data[totalSum].toFixed(2)}</span><br>`;
                }
            });
        });
})

/**
 * Подготавливает и возвращает массив с базовой ценой
 * @param {items} - элементы корзины
 * @returns {array}
 */
function getBasePrice(items) {
    const res = []
    items.forEach(item => {
        res.push({ price: item.dataset.itemBaseprice });
    })

    return res;
}