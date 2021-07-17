import { User } from '../js/models/user.js';

const {log} = console;
const avatars = [
    'http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G',
    'http://0.gravatar.com/avatar/48959f453dffdb6236f4b33eb8e9f4b7?s=50&d=identicon&r=G',
    'http://0.gravatar.com/avatar/06458359cb9e370d7c15bf6329e5facb?s=50&d=identicon&r=G',
    'http://1.gravatar.com/avatar/db7700c89ae12f7d98827642b30c879f?s=50&d=identicon&r=G',
    'http://0.gravatar.com/avatar/cb947f0ebdde8d0f973741b366a51ed6?s=50&d=identicon&r=G',
    'http://1.gravatar.com/avatar/9bc7250110c667cd35c0826059b81b75?s=50&d=identicon&r=G'
];
const UI = {
    btnSrch: $('.btn-srch-people'),
    peopleStorageList: $('.storaged-people'),
    foundPeopleList: $('.found-people'),
    inputSrch: $('.input-srch-people')
}
let users = null;

function generateAvatar(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}




(async function(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = (await response.json()).map(u => {
            return new User(u.id, u.email, u.name, u.username, avatars[generateAvatar(0, avatars.length - 1)])
        });
        
        users.forEach(u => {
            UI.peopleStorageList.append(`<a class="dummy-media-object" href="http://twitter.com/SaraSoueidan">
            <img class="round" src="${u.avatar}" alt="user"/>
            <h3>${u.name}</h3></a>`);
        });

    } catch(err) {
        log('Error!!!', err);
    }
}())




UI.btnSrch.click(() => {
    UI.foundPeopleList.empty();
    UI.foundPeopleList.append(`<h2>Found people:</h2>`);
    users.forEach(u => {
        if(u.name.toLowerCase().includes(UI.inputSrch.val().toLowerCase()) && 
        UI.inputSrch.val() != '') {
            UI.foundPeopleList.append(`<a class="dummy-media-object" href="http://twitter.com/SaraSoueidan">
                <img class="round" src="${u.avatar}" alt="user"/>
                <h3>${u.name}</h3></a>`);
        }
    });
});