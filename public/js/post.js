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

// Function to Delete Post
const postDelete = async (event) => {
    event.preventDefault();

    const url = window.location.href;
    const postId = url.split('post-delete/').pop().split('?')[0];

    const deletePost = async (postId) => {
        return fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            body: JSON.stringify({postId}),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            console.log(`Status: ${response.status}`);
            if (!response.ok) {
                alert('Error Deleting');
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

    let results = await deletePost(postId);
    console.log(results);
    document.location.replace('/dashboard');



}

// Click to leave comment
document
    .querySelector('.comment-form')
    .addEventListener('submit', commentHandler);

// Click to Delete Post
document
    .querySelector('#yes-delete-post')
    .addEventListener('click', postDelete);