'use strict';

// task 1
const UI = {
    input: document.querySelector('.section-input textarea'),
    btnFormat: document.querySelector('button'),
    display: document.querySelector('.section-display .display')
};

UI.btnFormat.onclick = function() {
    try {
        JSON.parse(UI.input.value);
        UI.display.value = JSON.stringify(JSON.parse(UI.input.value), undefined, 4);

    } catch (error) {
        UI.display.value = 'Error, data is not in JSON format';
    }
}






// task 2
const catalogUI = {
    catalog: document.querySelector('.catalog'),
    users: document.querySelector('.catalog .users'),
    table: document.querySelector('.catalog .table-container'),
    btnShowPosts: document.querySelector('.catalog .btn-show-posts'),
    posts: document.querySelector('.catalog .posts-container')
};

class User {
    constructor(id, name, username, email, address, phone, website, company) {
        this.id = id,
        this.name = name,
        this.username = username,
        this.email = email,
        this.address = address,
        this.phone = phone,
        this.website = website,
        this.company = company
    }
}

let data = [];

window.onload = function() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

    xhr.onload = function () {
        let users = createUsersArr(JSON.parse(xhr.response));
        createUsersUI(users);
    };
    xhr.onerror = function () { 
        alert(`Ошибка соединения. ${xhr.status}`);
    };
    xhr.send();
}

function createUsersArr(arr) {
    let users = [];
    for(let i = 0; i < arr.length; i++) {
        users.push (
            new User(arr[i].id, arr[i].name, arr[i].username, arr[i].email, arr[i].address, arr[i].phone, arr[i].website, arr[i].company)
        );
    }
    return users;
}

function createUsersUI(users) {
    for(let i = 0; i < users.length; i++) {
        let div = document.createElement('div');
        div.innerText = users[i].name;
        div.onclick = function() {
            catalogUI.table.innerHTML = getTable(users[i]);
            createBtnShowPosts(users[i].id);
            window.scrollBy(0, 450); // automatically scroll down to see the table
        }

        catalogUI.users.appendChild(div);
    }
}

function getTable(user) {
    return `<table>
                <tr>
                    <td>Name:</td>
                    <td>${user.name}</td>
                </tr>
                <tr>
                    <td>Username:</td>
                    <td>${user.username}</td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td>${user.address.city}, ${user.address.street}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td>${user.phone}</td>
                </tr>
                <tr>
                    <td>Website:</td>
                    <td>${user.website}</td>
                </tr>
            </table>`;
}

function createBtnShowPosts(userId) {
    catalogUI.btnShowPosts.classList.remove('hidden');
    catalogUI.btnShowPosts.onclick = function() {
        showUserPosts(userId);
    }
}

function showUserPosts(userId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    xhr.onload = function () {
        render(JSON.parse(xhr.response));
        window.scrollBy(0, 600);
    };
    xhr.onerror = function () { 
        alert(`Ошибка соединения. ${xhr.status}`);
    };
    xhr.send();
}

function render(content) {
    let innerHTML = '<h2>User\'s posts:</h2>';
    for(let i = 0; i < content.length; i++) {
        innerHTML += `<div>
                            <p>${content[i].title}</p>
                            <p>${content[i].body}</p>
                      </div>`;
    }
    catalogUI.posts.innerHTML = innerHTML;
}