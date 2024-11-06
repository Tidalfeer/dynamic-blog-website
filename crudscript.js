function generateId() {
    return '_' + Math.random().toString(36).substr(2,8);
}

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function displayPosts() {
    const posts = getPosts();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = ' <h2>${post.title}</h2> <p>${post.content}</p> <button onclick="viewPost(${post.id})">View/Edit</button> <button onclick="deletePsot(${post.id})>Delete</button>';

      
    postsContainer.appendChild(postDiv);
    });
}

function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const post = getPosts();
    posts.push({ id: generateId(), title, content});
    savePosts(posts);

    window.location.href = 'index.html';
}

function viewPost(id) {
    localStorage.setItem('currentPostId', id);
    window.location.href = 'post.html';
}

function loadPost() {
    const id = localStorage.getItem('currentPostId');
    if (!id) return;

    const posts = getPosts();
    const post = posts.find(p => p.id === id);

    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
}

function updatePost() {
    const id = localStorage.getItem('currentPostId');
    if (!id) return;

    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    post.title = document.getElementById('title').value;
    post.content = document.getElementById('currentPostId').value;
    savePosts(posts);

    alert ('Post updated successfully');
}

function deletePost(id = null, redirect = false) {
    id = id || localStorage.getItem('currentPostId');
    if (!id) return;

    const posts = getPosts().filter(post => post.id !== id);
    savePosts(posts);

    if (redirect) {
        window.location.href = 'index.html';
    } else { 
        alert('Post Deleted!');
        window.location.href = 'index.html';
    }
}

if (window.location.pathname.includes('index.html')) {
    displayPosts();
} else if (window.location.pathname.includes('post.html')){
    loadPost();
}