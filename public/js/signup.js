const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const sendLogin = async (username, email, password) => {
        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
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

    let results = await sendLogin(username, email, password);
        
    if (results.status === 200) {
      console.log(results.message);
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  } else {
    alert('Please fill out all required fields!');
  }

};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupHandler)