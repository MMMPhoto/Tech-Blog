// Function to submit comment
const commentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();
    const url = window.location.href;
    const postId = url.split('post-new-comment/').pop().split('?')[0];

    if (text) {
        const sendComment = async (text, postId) => {
            return fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({text, postId}),
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

        let results = await sendComment(text, postId);
        console.log(results);
        document.location.replace(`/post/${postId}`);
    }
};

// Click to leave comment
document
    .querySelector('.comment-form')
    .addEventListener('submit', commentHandler);