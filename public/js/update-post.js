// Update Post Handler Function
const postHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();
    const url = window.location.href;
    const postId = url.split('post/').pop().split('?')[0];

    const updatePost = async (title, contents) => {
        return fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, contents}),
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

    let results = await updatePost(title, contents);
    console.log(results);
    document.location.replace(`/post/${results.id}`);

};

document
    .querySelector('.update-post-form')
    .addEventListener('submit', postHandler)