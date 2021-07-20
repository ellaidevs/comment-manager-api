const fetch = require('node-fetch');

getPost = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        redirect: 'folow'
    });
    return data;
}

getComment = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "GET",
        redirect: 'folow'
    });
    return data;
}

module.exports = {getPost, getComment};