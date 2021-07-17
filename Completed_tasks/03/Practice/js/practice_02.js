document.write(`<h1 style="${tasksColor}">Practice 2:</h1>`);

/* Task 1: Реализовать класс Button, который содержит ширину, высоту,
текст кнопки и метод showBtn(), который выводит кнопку на экран
с помощью тега button и функции document.write().
Реализовать класс BootstrapButton, унаследовав его от класса
Button. Добавить поле color и переопределить метод showBtn()
так, чтобы кнопка выводилась со стилями и указанным цветом. */
document.write(`<p style="${tasksColor}">Task 1:</p>`);

class Button {
    constructor(width, height, text) {
        this.width = width;
        this.height = height;
        this.text = text;
    }
    showBtn() {
        document.write(`<button style="width: ${this.width}; height: ${this.height};">${this.text}</button>`);
    }
}
let btn = new Button('150px', '50px', 'Plain Btn');
btn.showBtn();

class BootstrapButton extends Button {
    constructor(width, height, text, color) {
        super(width, height, text);
        this.color = color;
    }
    showBtn() {
        document.write(`<button style="width: ${this.width}; height: ${this.height}; background-color: ${this.color};">${this.text}</button>`);
    }
}
let bootstrapBtn = new BootstrapButton('150px', '50px', 'Bootstrap Btn', 'violet');
bootstrapBtn.showBtn();




/* Task 2: Реализовать класс, описывающий геометрическую фигуру со
свойствами и методами:
■ get-свойство для получения названия фигуры; 
■ метод для вывода информации о фигуре (стороны и их
длина);
■ метод для вычисления площади фигуры;
■ метод для вычисления периметра фигуры.
Реализуйте классы-наследники: квадрат, прямоугольник и
треугольник. Переопределите методы вывода и вычислений в
классах-наследниках.
Создайте массив с различными фигурами и выведите информацию о каждой фигуре, включая площадь и периметр. */
document.write(`<br><p style="${tasksColor}">Task 2:</p>`);

class GeometricFigure {
    constructor(name, abLength, bcLength, cdLength) {
        this._name = name;
        this.abLength = abLength;
        this.bcLength = bcLength;
        this.cdLength = cdLength;
    }
    get figureName() {
        return this._name;
    }
    figureInfo() {
        document.write (
            `Length of side AB: ${this.abLength}<br>
             Length of side BC: ${this.bcLength}<br>
             Length of side CD: ${this.cdLength}<br>`
        );
    }
    showFullFigureInfo() {
        document.write(`Figure name: ${this.figureName}<br>`);
        this.figureInfo();
        document.write(`Figure perimetr: ${this.getFigurePerimetr()}<br>`);
        document.write(`Figure area: ${this.getFigureArea()}<br><br>`);
    }
    getFigureArea() {}
    getFigurePerimetr() {}
}

class Triangle extends GeometricFigure {
    constructor(name, abLength, bcLength, cdLength) {
        super(name, abLength, bcLength, cdLength);
    }
    getFigurePerimetr() {
        return this.abLength + this.bcLength + this.cdLength;
    }
    getFigureArea() {
        let p = this.getFigurePerimetr() / 2;
        return Math.sqrt(p * (p - this.abLength) * (p - this.bcLength) * (p - this.cdLength));
    }
}

class Square extends GeometricFigure {
    constructor(name, abLength, bcLength, cdLength, daLength) {
        super(name, abLength, bcLength, cdLength);
        this.daLength = daLength;
    }
    figureInfo() {
        super.figureInfo();
        document.write(`Length of side DA: ${this.daLength}<br>`);
    }
    getFigurePerimetr() {
        return this.abLength * 4;
    }
    getFigureArea() {
        return this.abLength * this.abLength;
    }
}

class Rectangle extends GeometricFigure {
    constructor(name, abLength, bcLength, cdLength, daLength) {
        super(name, abLength, bcLength, cdLength);
        this.daLength = daLength;
    }
    figureInfo() {
        super.figureInfo();
        document.write(`Length of side DA: ${this.daLength}<br>`);
    }
    getFigurePerimetr() {
        return (this.abLength + this.bcLength) * 2;
    }
    getFigureArea() {
        return this.abLength * this.bcLength;
    }
}

let figures = [
    new Triangle('Triangle', 30, 40, 50),
    new Square('Square', 30, 30, 30, 30),
    new Rectangle('Rectangle', 30, 60, 30, 60)
];

figures.forEach(item => item.showFullFigureInfo());




/* Task 3: Реализуйте класс ExtentedArray, унаследовав его от стандартного класса Array и добавив следующие методы:
■ метод getString(separator) – для получения строки со
всеми элементами массива, перечисленными через указанный разделитель: запятая, тире, пробел и т. д.;
■ метод getHtml(tagName) – для получения строки с html
кодом, где каждый элемент массива будет обернут в указанный тег (учтите, если указывается тег li, то все элементы дополнительно необходимо обернуть в ul).
Создайте объект класса ExtentedArray, заполните его данными и выведите на экран результаты работы методов getString()
и getHtml(). */
document.write(`<br><p style="${tasksColor}">Task 3:</p>`);

class ExtentedArray extends Array {
    getString(separator) {
        return this.join(separator);
    }
    getHtml(tagName) {
        let htmlStr = '';

        if(tagName === 'li') {
            htmlStr += '<ul>';
        }
        this.forEach(item => {
            htmlStr += `<${tagName}>${item}</${tagName}>`;
        });
        if(tagName === 'li') {
            htmlStr += '</ul>';
        }

        return htmlStr;
    }
}

let extentedArray = new ExtentedArray(1, 2, 3, 4, 5);
document.write(`1) Array like string: ${extentedArray.getString('-')}`);
document.write('<br>2) Array in html:<br>');
document.write(`${extentedArray.getHtml('li')}`);

document.write('<hr>');



