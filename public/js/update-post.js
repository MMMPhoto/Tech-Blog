// New Post Handler Function
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
            console.log(`Status: ${response.status}`);
            if (!response.ok) {
                alert('Error Posting');
                return;
            } else {
                return response.json();        
            };
        })
        .then((results) => {
            console.log(results);
            return results;
        })
        .catch(err => response.status(500).send(err));
    };

    let results = await sendPost(title, contents);
    console.log(results);
    document.location.replace(`/post/${results.id}`);
  }

};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', postHandler)