'use strict';
// Task 1: Создать html-страницу со списком ссылок.
// Ссылки на внешние источники (которые начинаются с http://)
// необходимо подчеркнуть пунктиром.
// Искать такие ссылки в списке и устанавливать им дополнительные стили необходимо с помощью JS.

let linksContainer = document.querySelector('.links-container');
let liElements = document.querySelectorAll('.links-container li');
let aElements = document.querySelectorAll('.links-container li a');

// styles for ul
linksContainer.style.backgroundColor = '#ffd36d';
linksContainer.style.width = '200px';
linksContainer.style.padding = '30px';
linksContainer.style.listStyle = 'circle';

// styles for li
for(let i = 0; i < liElements.length; i++) {
    liElements[i].style.paddingBottom = '10px';
}

// styles for a
for(let i = 0; i < aElements.length; i++) {
    aElements[i].style.textDecoration = 'none';
    aElements[i].style.color = '#000';

    // add underline to external  links
    let linkText = aElements[i].innerHTML;
    if(linkText.substr(0, 7) === 'http://' || 
    linkText.substr(0, 8) === 'https://') {
        aElements[i].style.borderBottom = '1px dashed #000';
    }
}





// Task: 2 Создать html-страницу с деревом вложенных директорий.
// При клике на элемент списка, он должен сворачиваться или
// разворачиваться. При наведении на элемент, шрифт должен становится жирным (с помощью CSS).

// textToggle.classList.toggle('hidden-element');

// let diskC = document.querySelector('.disk-c');
// let diskD = document.querySelector('.disk-d');
// let diskE = document.querySelector('.disk-e');


// let diskCfolders = document.querySelector('.disk-c-folders');
// let diskDfolders = document.querySelector('.disk-d-folders');
// let diskEfolders = document.querySelector('.disk-e-folders');


let allDisks = document.querySelectorAll('.disks .disk');
let allDiskFolders = document.querySelectorAll('.disks .disk-folders');
let allDiskFoldersLi = document.querySelectorAll('.disks .disk-folders li');


// allDisks and allDiskFolders have the same amount of elements
for(let i = 0; i < allDisks.length; i++) {
    allDisks[i].onclick = function() {
        allDiskFolders[i].classList.toggle('hidden-element');
    }
}
for(let i = 0; i < allDiskFoldersLi.length; i++) {
    allDiskFoldersLi[i].onclick = function(e) {
        // таким образом запретим клик по вложенным элементам li класса .disk-folders, что бы при клике на них не срабатывал toggle
        e.stopPropagation();
    }
}





// Task 3: Создать html-страницу со списком книг.
// При щелчке на элемент, цвет текста должен меняться на оранжевый. При повторном щелчке на другую книгу, предыдущей
// необходимо возвращать прежний цвет.
// Если при клике мышкой была зажата клавиша Ctrl, то элемент
// добавляется/удаляется из выделенных. 
// Если при клике мышкой
// была зажата клавиша Shift, то к выделению добавляются все
// элементы в промежутке от предыдущего кликнутого до текущего.

let books = document.querySelectorAll('.books-container li');



let prevSelectedBook = null;
let prevSelectedBookIdx = -1;

function saveSelect(idx) {
    prevSelectedBook = books[idx];
    prevSelectedBookIdx = idx;
} 

for(let i = 0; i < books.length; i++) {
    books[i].onclick = function(e) {

        // была зажата клавиша Ctrl
        if(e.ctrlKey === true) {
            books[i].classList.toggle('selected-item');
            saveSelect(i);
        }

        // была зажата клавиша Shift
        else if(e.shiftKey === true) {

            books[i].classList.add('selected-item');

            if(prevSelectedBook != null && prevSelectedBook != books[i]) {
                if(prevSelectedBookIdx < i) {
                    for(let j = 0; j < books.length; j++) {
                        if(j > prevSelectedBookIdx && j < i) {
                            books[j].classList.add('selected-item');
                        }
                    }
                }
                else {
                    for(let j = 0; j < books.length; j++) {
                        if(j < prevSelectedBookIdx && j > i) {
                            books[j].classList.add('selected-item');
                        }
                    }
                }
            } 
            saveSelect(i);
        }
        else {
            books[i].classList.add('selected-item');
            if(prevSelectedBook != null && prevSelectedBook != books[i]) {
                prevSelectedBook.classList.remove('selected-item');
            }
            saveSelect(i);
        }

    }
} 





// Task 4 Создать html-страницу для отображения/редактирования текста.
// При открытии страницы текст отображается с помощью тега
// div. При нажатии Ctrl+E, вместо div появляется textarea с тем
// же текстом, который теперь можно редактировать. При нажатии
// Ctrl+S, вместо textarea появляет div с уже измененным текстом.

let text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat libero rem velit voluptas recusandae eum aliquid quia obcaecati unde. Temporibus itaque, obcaecati adipisci repellat voluptates quibusdam voluptas a hic nostrum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores eius hic ratione quidem, illo reiciendis accusamus repudiandae numquam cupiditate iusto vel quas distinctio molestiae! Non aperiam distinctio itaque reiciendis quaerat?';

let textToEditDiv = document.querySelector('.text-to-edit-div');
let textToEditTextarea = document.querySelector('.text-to-edit-textarea');

// first add to div and textarea the same text
textToEditDiv.innerText = text;
textToEditTextarea.value = text;

let wasCtrlEPressed = false;

document.onkeydown = function(e) {
    if(e.ctrlKey == true && e.code == "KeyE") {
        e.preventDefault();

        // hide div and show textarea
        textToEditDiv.classList.toggle('hidden-element');
        textToEditTextarea.classList.toggle('hidden-element');
        wasCtrlEPressed = true;
    }
    if(e.ctrlKey == true && e.code == "KeyS") {
        e.preventDefault();
        textToEditDiv.innerHTML = textToEditTextarea.value;
        
        if(wasCtrlEPressed) {
            textToEditDiv.classList.remove('hidden-element');
        }
        textToEditTextarea.classList.add('hidden-element');
        wasCtrlEPressed = false;
    }
}






// Task 5: Создать html-страницу с большой таблицей.
// При клике по заголовку колонки, необходимо отсортировать
// данные по этой колонке.

const TABLE = {
    rowsParent: document.querySelector('tbody'),
    rows: document.querySelectorAll('tbody tr'),
    headers: document.querySelectorAll('th')
};


for(let i = 0; i < TABLE.headers.length; i++) {

    TABLE.headers[i].onclick = function() {
        
        // переводим в массив что бы отсортировать
        let rowsArr = Array.from(TABLE.rows)
            .sort((rowA, rowB) => rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1);
    
        // вставляем заново а удалятся они сами
        TABLE.rowsParent.append(...rowsArr);
    }
}





// Task 6: Создать html-страницу с блоком текста в рамочке.
// Реализовать возможность изменять размер блока, если зажать
// мышку в правом нижнем углу и тянуть ее дальше.

let stretchBlock = document.getElementById('stretch-block');
let stretchControl = document.getElementById('stretch-control');
let wasStretchControlPressed = false;

function getBlockDistanceFromScreenTop() {
    return stretchBlock.getBoundingClientRect().y;
}
function getBlockDistanceFromScreenLeft() {
    return stretchBlock.getBoundingClientRect().x;
}

let currentMousePosition;


stretchControl.onmousedown = function(e) {
    console.log('MouseDown');
    wasStretchControlPressed = true;
}
document.onmouseup = function(e) {
    console.log('MouseUp');
    wasStretchControlPressed = false;
}
document.onmousemove = function(e) {
    currentMousePosition = {
        x: e.x,
        y: e.y
    };
    if(wasStretchControlPressed) {
        // высчитываем ширину и высоту
        stretchBlock.style.width = `${currentMousePosition.x - getBlockDistanceFromScreenLeft() - 50}px`;
        stretchBlock.style.height = `${currentMousePosition.y - getBlockDistanceFromScreenTop() - 50}px`;
    }
}
