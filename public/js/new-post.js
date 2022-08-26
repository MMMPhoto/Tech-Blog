const postHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();

  if (title && contents) {
    const sendPost = async (title, contents) => {
        return fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
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
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Error Posting');
    }
  }

};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', postHandler)