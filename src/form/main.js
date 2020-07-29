const errorBlock = document.querySelector('.auth-form__error-message');
document.querySelector('#button').addEventListener('click', e => {
    e.preventDefault();
    errorBlock.classList.add('show');
})
document.querySelector('.close').addEventListener('click', e => {
    errorBlock.classList.remove('show');
})