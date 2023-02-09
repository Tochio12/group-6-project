const loginFormHandler = async function(event) {
  event.preventDefault();

  const username = document.querySelector('#username-input-login').value.trim();
  const password = document.querySelector('#password-input-login').value.trim();

 if (username && password) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to login');
  }
}
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);