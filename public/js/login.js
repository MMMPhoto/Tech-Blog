const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const sendLogin = async (username, password) => {
        return fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            return response;
        })
        .then((results) => {
            return results;
        })
        .catch(err => response.status(500).send(err));
    };

    let results = await sendLogin(username, password);
        
    if (results.status === 200) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }

};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler)