'use strict';

// Task 1: Создать html-страницу для генерации случайных чисел. На
// странице должна быть кнопка, при нажатии на которую случайное
// целое число от 0 до 100 выводится в div...
let randomBtn = document.querySelector('.random-button');
let randomDisplay = document.querySelector('.random-display');
function generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

randomBtn.onclick = function(e) {
    randomDisplay.innerHTML = generateRandomNumber(0, 100);
};



// Task 2: Создать html-страницу с div, который занимает всю ширину
// и высоту экрана. При движении мышкой внутри этого div, выводить текущие координаты мышки. При клике кнопкой мыши туда
// же, выводить, какой именно кнопкой был совершен клик (правой
// или левой).

let mouseTrackerBlock = document.querySelector('.mouse-tracker');
let x = document.querySelector('.coordX-display');
let y = document.querySelector('.coordY-display');
document.onmousemove = function(e) {
    x.innerHTML = e.x;
    y.innerHTML = e.y;
};

document.oncontextmenu = function() {
    return false;
}

let btnName = document.querySelector('.button-name-display');
mouseTrackerBlock.onmousedown = function(e) {
    switch(e.button){
        case 0: 
            btnName.innerHTML = "Pressed left button";
            break;
        case 2: 
            btnName.innerHTML = "Pressed right button";
            break;
    }
} 



// Task 3: Создать html-страницу, на которой будет кнопка и текст. При
// нажатии на кнопку, текст должен скрываться. При повторном нажатии – текст должен снова отображаться...
let btnToggle = document.querySelector('.hide-button');
let textToggle = document.querySelector('.hide-text');

btnToggle.onclick = function() {
    textToggle.classList.toggle('hidden-element');
}



// Task 4: Создать html-страницу со вкладками. С левой стороны страницы отображается несколько вкладок, по которым можно переключаться. У каждой вкладки есть свое содержимое, но в один момент
// времени отображается содержимое только активной вкладки...
let textHtml = 'The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.';
let textCss = 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.[1] CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.[2] CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.[3] This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple web pages to.';
let textJs = 'JavaScript (/ˈdʒɑːvəˌskrɪpt/),[8] often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.[9] JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.[10] Over 97% of websites use it client-side for web page behavior,[11] often incorporating third-party libraries.'

let tabHtml = document.querySelector('.tab-html');
let tabCss = document.querySelector('.tab-css');
let tabJs = document.querySelector('.tab-js');

let textToShow = document.querySelector('.toggle-block-text');

tabHtml.onclick = function() {
    textToShow.innerHTML = textHtml;
}
tabCss.onclick = function() {
    textToShow.innerHTML = textCss;
}
tabJs.onclick = function() {
    textToShow.innerHTML = textJs;
}




// Task 5: Создать html-страницу со списком новостей. Возле каждой
// новости должна быть кнопка Удалить, при нажатии на которую
// соответствующая новость исчезает.
let newsContainer = document.querySelector('.news-container');
let allNews = document.querySelectorAll('.news-container > div');
let allButtons = document.querySelectorAll('.news-container button');

// allNews and allButtons have the same amount of elements
for(let i = 0; i < allButtons.length; i++) {
    allButtons[i].onclick = function() {
        newsContainer.removeChild(allNews[i]);
    }
}




// Task 6: Создать html-страницу с progressbar и кнопкой, при нажатии
// на которую заполненность progressbar увеличивается на 5%.
let btnAddProgress = document.querySelector('.btn-add-progress');
let progressBar = document.querySelector('.progress-container progress');

btnAddProgress.onclick = function() {
    let progressValue = progressBar.getAttribute('value');
    progressValue = String(Number(progressValue) + 5);
    if(progressValue > 100) { 
        return;
    }
    progressBar.setAttribute('value', progressValue);
}