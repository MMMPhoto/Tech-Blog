// Function to display comment form
const getCommentForm = async (event) => {
    event.preventDefault();

    document.querySelector('.comment-form').style.display = "inline";
    document.querySelector('#leave-comment').style.display = "none";
};

// Function to submit comment
const commentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();

  if (text) {
    const sendComment = async (title, contents) => {
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

    let results = await sendComment(title, contents);
    console.log(results);
    document.location.replace(`/post/${results.id}`);
  }

};

// Click to leave comment
document
    .querySelector('#leave-comment')
    .addEventListener('click', getCommentForm)

// Click to submit comment
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentHandler)