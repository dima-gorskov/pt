const select = document.querySelector('#currency');

select.addEventListener('change', e => {
    fetch('/api/getrates', { method: 'post' })
        .then(res => console.log(res));
})