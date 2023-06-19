const commentForm = document.querySelector('form');
const commentTextarea = document.querySelector('textarea');
const commentList = document.querySelector('.comments');

const savedCommentText = localStorage.getItem('commentText');
if (savedCommentText) {
    commentTextarea.value = savedCommentText;
}

const commentTemplate = `
    <div class="user_cross_layout">
        <div class="abbrev_username_layout">
            <p class="abbrev"></p>
            <p class="username"></p>
        </div>
        <div class="cross_layout">
            <p class="cross">X</p>
        </div>
    </div>
    <div>
        <p class="comment_area">Lorem ipsum elit. Deleniti, doloremque. </p>
    </div>
`;

function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = commentTemplate;

    const abbrevElement = commentElement.querySelector('.abbrev');
    abbrevElement.textContent = comment.user.username.split(' ').map(el => el.charAt(0).toUpperCase()).join('')

    const usernameElement = commentElement.querySelector('.username');
    usernameElement.textContent = comment.user.username;

    const commentTextElement = commentElement.querySelector('.comment_area');
    commentTextElement.textContent = comment.body;

    const crossElement = commentElement.querySelector('.cross');
    crossElement.addEventListener('click', function () {
        commentElement.remove();
    });

    return commentElement;
}

fetch('https://dummyjson.com/comments')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < 3; i++) {
            const comment = data["comments"];
            const commentElement = createCommentElement(comment[i]);
            commentList.insertBefore(commentElement, commentList.firstChild);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

function handleFormSubmit(event) {
    event.preventDefault();

    const commentText = commentTextarea.value.trim();
    if (commentText !== '') {
        const newComment = {
            id: Date.now(),
            body: commentText,
            user: {
                id: null,
                username: 'Current User'
            }
        };

        const commentElement = createCommentElement(newComment);
        commentList.appendChild(commentElement);

        commentTextarea.value = '';
    }
}

commentForm.addEventListener('submit', handleFormSubmit);

commentTextarea.addEventListener('input', function () {
    localStorage.setItem('commentText', commentTextarea.value);
});
