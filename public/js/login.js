const loginHandler = async (event) => {
    event.preventDefault();
    //Collect from login.handlebars' login portion
    const email = document.querySelector('#emailogin').value.trim;
    const pass = document.querySelector('#password-login').value.trim;
    //Fill-in for function replacement
    const response = await fetch('/api/user/login', {
        method: 'POST',
        bosy: JSON.stringify({
            user: email.value,
            password: pass.value,
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        documentation.location.replace('/dashboard');
    } else {
        alert('Failed to login');
    }
}

const signupHandler = async (event) => {
    event.preventDefault();
    //Collect from login.handlebars' signup portion
    const email = document.querySelector('#emailsign').value.trim;
    const pass = document.querySelector('#password-sign').value.trim;
    //Fill-in for function replacement
    const response = await fetch('/api/user', {
        method: 'POST',
        bosy: JSON.stringify({
            user: email.value,
            password: pass.value,
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        documentation.location.replace('/dashboard');
    } else {
        alert('Failed to sign up');
    }
}
//addEventListeners for both Login and SignUp
document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEvenetListener('submit', signupHandler);