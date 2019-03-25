const signUp = document.querySelector('#btnSingUp')
const title = document.querySelector('#title')

signUp.addEventListener('click', (event) => {
    if (title.innerText === 'Sign In') {
        title.innerText = 'Sign Up'
        signUp.innerText = 'Sign In'
    } else {
        title.innerText = 'Sign In'
        signUp.innerText = 'Sign Up'
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => { document.querySelector('body').click(); }, 3000);
});



