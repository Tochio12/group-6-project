const loginHandler = async (event) => {
    event.preventDefault();
    //Collect from login.handlebars' login portion
    const email = document.querySelector('#emailogin').value.trim;
    const pass = document.querySelector('#password-login').value.trim;

    if (email && pass) {
        
    }
    
}

const signupHandler = async (event) => {
    event.preventDefault();
    //Collect from login.handlebars' signup portion
    const email = document.querySelector('emailsign').value.trim;
    const pass = document.querySelector('#password-sign').value.trim;

    if (email && pass) {

    }
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);

document
    .querySelector('.signup-form')
    .addEvenetListener('submit', signupHandler);