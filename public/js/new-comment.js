// Function to submit comment
const commentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();
    console.log(window.location.href)


  if (text) {
    const sendComment = async (text) => {
        return fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({text}),
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

    let results = await sendComment(text);
    console.log(results);
    document.location.reload();
  }

};

// Click to submit comment
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentHandler);