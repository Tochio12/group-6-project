const loginHandler = async (event) => {
    event.preventDefault();
    //Collect from login.handlebars' login portion
    const email = document.querySelector('#emailogin').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //Fill-in for function replacement

   if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to login');
    }
}

}

const signupHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailsign').value.trim();
    const password = document.querySelector('#password-sign').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/signup', {
          method: 'post',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
          console.log('success');
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
  }
//addEventListeners for both Login and SignUp

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);