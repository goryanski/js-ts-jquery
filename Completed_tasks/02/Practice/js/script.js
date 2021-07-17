'use strict';
/* Task 1 - создать массив фруктов... */
document.write('<p style="color: red;">Task 1:</p>');

let arr = [];
arr.push('banana', 'apple', 'grapes', 'cherry', 'blackberry');
arr.sort();

// 1) output like ul-list
document.write('<p style="margin: 0; padding: 0;">Fruits:</p>');
document.write('<ul style="margin: 0;">');
for(let i = 0; i < arr.length; i++) {
    document.write(`<li>${arr[i]}</li>`);
}
document.write('</ul>');

// 2) find
function fruitSrch(name) {
    return arr.findIndex(item => 
        item.toLowerCase() === name.toLowerCase());
}

let srchFruit = 'banana';
let srchIdx = fruitSrch(srchFruit);

if(srchIdx != -1) {
    document.write(`<br>Fruit ${srchFruit} has idx: ${srchIdx}<br>`);
}
else {
    document.write(`<br>Fruit ${srchFruit} not found<br>`);
}




/* Task 2 - Прямогугольник */
document.write('<br><br><p style="color: red;">Task 2:</p>')

let rectangle = {
    pointA: {
        x: -4,
        y: 4
    },
    pointB: {
        x: 8,
        y: 4
    },
    pointC: {
        x: 8,
        y: -2
    },
    pointD: {
        x: -4,
        y: -2
    }
};

/*
    A(-4; 4)                      B(8; 4)
    -------------------------------
    |                             |
    |                             |
    |                             |
    -------------------------------
    D(-4: -2)                     C(8; -2)

*/

// 1) где какая точка расположенна
function showDotsLocation(rectangle) {
    document.write(`Point A (${rectangle.pointA.x}: ${rectangle.pointA.y})<br>`);
    document.write(`Point B (${rectangle.pointB.x}: ${rectangle.pointB.y})<br>`);
    document.write(`Point C (${rectangle.pointC.x}: ${rectangle.pointC.y})<br>`);
    document.write(`Point D (${rectangle.pointD.x}: ${rectangle.pointD.y})<br>`);
}
showDotsLocation(rectangle);


// 2) ф-ция возвращает ширину
function getRectangleWidth(rectangle) {
    return Math.abs(rectangle.pointA.x - rectangle.pointB.x);
}
document.write(`<br>Rectangle width: (${getRectangleWidth(rectangle)})<br>`);


// 3) ф-ция возвращает высоту
function getRectangleHeight(rectangle) {
    return Math.abs(rectangle.pointA.y - rectangle.pointD.y);
}
document.write(`<br>Rectangle height: (${getRectangleHeight(rectangle)})<br>`);


// 4) ф-ция возвращает площадь
function getRectangleArea(rectangle) {
    return getRectangleWidth(rectangle) * getRectangleHeight(rectangle);
}
document.write(`<br>Rectangle area: (${getRectangleArea(rectangle)})<br>`);


// 4) ф-ция возвращает периметр
function getRectanglePerimeter(rectangle) {
    return (getRectangleWidth(rectangle) + getRectangleHeight(rectangle)) * 2;
}
document.write(`<br>Rectangle perimeter: (${getRectanglePerimeter(rectangle)})<br>`);


// 4) ф-ция изменения ширины
function changeRectangleWidth(rectangle, value) {
    if(value < 0) {
        if((getRectangleWidth(rectangle) + value) < 1) {
            return false;
        }
    }
    rectangle.pointB.x += value;
    rectangle.pointC.x += value;
    return true;
}

let changedWidth = changeRectangleWidth(rectangle, 4)
if(changedWidth) {
    document.write(`<br>New rectangle wigth: (${getRectangleWidth(rectangle)})<br>`);
}
else {
    document.write(`<br>Invalid value, width has not been changed<br>`);
}


// 4) ф-ция изменения высоты
function changeRectangleHeight(rectangle, value) {
    if(value < 0) {
        if((getRectangleHeight(rectangle) + value) < 1) {
            return false;
        }
    }
    rectangle.pointD.y -= value;
    rectangle.pointC.y -= value;
    return true;
}

let changedHeight = changeRectangleHeight(rectangle, 2)
if(changedHeight) {
    document.write(`<br>New rectangle height: (${getRectangleHeight(rectangle)})<br>`);
}
else {
    document.write(`<br>Invalid value, height has not been changed<br>`);
}




/* Task 3 - Ф-ция для проверки спама */
document.write('<br><br><p style="color: red;">Task 3:</p>')

function isMessageSpam(message) {
    if (
    message.toLowerCase().indexOf('100% бесплатно') != -1  ||
    message.toLowerCase().indexOf('увеличение продаж') != -1 ||
    message.toLowerCase().indexOf('только сегодня') != -1 ||
    message.toLowerCase().indexOf('не удаляйте') != -1 ||
    message.toLowerCase().indexOf('ххх') != -1) 
    {
        return true;
    }
    else {
        return false;
    }
}

let message = 'Только сегодня, спешите забрать последнюю редиску!';
let notification = isMessageSpam(message) ? 'You received spam' : 'This message is not spam';
document.write(notification);



/* Task 4 - Ф-ция сокращения строки */
document.write('<br><br><p style="color: red;">Task 4:</p>');
function truncate(str, maxLength) {
    if(str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}
document.write(truncate('Только cегодня, спешите забрать последнюю редиску!', 14));