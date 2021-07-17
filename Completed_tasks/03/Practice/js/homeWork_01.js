document.write(`<h1 style="${tasksColor}">Home work 1:</h1>`);

/* Task 1: Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:
■ поле, хранящее радиус окружности;
■ get-свойство, возвращающее радиус окружности;
■ set-свойство, устанавливающее радиус окружности;
■ get-свойство, возвращающее диаметр окружности;
■ метод, вычисляющий площадь окружности;
■ метод, вычисляющий длину окружности.
Продемонстрировать работу свойств и методов. */
document.write(`<p style="${tasksColor}">Task 1:</p>`);

class Circle {
    constructor(radius) {
        this._radius = radius;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        if (value < 1) return;
        this._radius = value;
    }
    get diametr() {
        return this._radius * 2;
    }
    getCircleArea() {
        return 3.14 * this._radius * this._radius;
    }
    getCircleLength() {
        return 2 * 3.14 * this._radius;
    }
}

let circle = new Circle(10);
document.write(`1) Get radius: ${circle.radius}<br>`);
document.write('2) Set radius: ');
circle.radius = 15;
document.write(`New radius - ${circle.radius}<br>`);
document.write(`3) Get diametr: ${circle.diametr}<br>`);
document.write(`4) Get area: ${circle.getCircleArea()}<br>`);
document.write(`5) Get circle length: ${circle.getCircleLength()}<br>`);


/* Task 2: Реализовать класс, описывающий html элемент.
Класс HtmlElement должен содержать внутри себя...*/
document.write(`<br><p style="${tasksColor}">Task 2:</p>`);

// create function insertAt()
String.prototype.insertAt = function(index, insertion) {
    let part1 = this.substr(0, index);
    let part2 = this.substr(index);
    return part1 + insertion + part2;
}

class HtmlElement {
    constructor(tagName, isTagSelfClosing, textContent, attributesArr, styles, insertedTagsArr) {
        this.tagName = tagName;
        this.isTagSelfClosing = isTagSelfClosing;
        this.textContent = textContent;
        this.attributesArr = attributesArr;
        this.styles = styles;
        this.insertedTagsArr = insertedTagsArr;
        this.htmlElementString = '';
    }
    setTag() {
        if(this.isTagSelfClosing) {
            this.htmlElementString = `<${this.tagName}>`;
        }
        else {
            this.htmlElementString = `<${this.tagName}></${this.tagName}>`;
        }
    }
    setText() {
        let textString = '>' + this.textContent;
        this.htmlElementString = this.htmlElementString.replace('>', textString);
    }
    setAttributes() {
        // insert all attributes except styles (if need be)
        let atributesString = ' ' + this.attributesArr.join(' ') + '>';
        this.htmlElementString = this.htmlElementString.replace('>', atributesString);
    }
    setStyles() {
        // add styles to attributes (if need be)
        let stylesString = ' ' + this.styles + '>';
        this.htmlElementString = this.htmlElementString.replace('>', stylesString);
    }
    pushInsertedTag(tag) {
        let idx = this.htmlElementString.lastIndexOf('</');
        let formatedTag = '\n\t' + tag;
        this.htmlElementString = this.htmlElementString.insertAt(idx, formatedTag);
    }
    unshiftInsertedTag(tag) {
        let idx = this.htmlElementString.indexOf('>');
        let formatedTag = '\n\t' + tag;
        this.htmlElementString = this.htmlElementString.insertAt(idx+1, formatedTag);
    }
    // method returns html-code as string
    getHtml() {
        return this.htmlElementString;
    }
}

// 1. add tag a
let a = new HtmlElement('a', false, 'More...', ['href="https://www.lipsum.com/"', 'target="_blank"']);
a.setTag();
a.setText();
a.setAttributes();

// 2. add tag p
let p = new HtmlElement('p', false, '\n"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quos facilis iure praesentium, id nostrum quae inventore blanditiis natus repudiandae voluptate magni recusandae hic architecto reiciendis! Vero in quasi illum."', [], 'style="text-align: justify;"', [a]);
p.setTag();
p.setText();
p.setStyles();

// insert a in p
p.pushInsertedTag(a.getHtml());


// 3. add h3
let h3 = new HtmlElement('h3', false, 'What is Lorem ipsum?');
h3.setTag();
h3.setText();


// 4 add img
let img = new HtmlElement('img', true, '', ['src="images/lipsum.jpg"', 'alt="Lorem Ipsum"'], 'style="width: 100%;"');
img.setTag();
img.setStyles();
img.setAttributes();


// 5. add inserted div-parent
let insertedDivParent = new HtmlElement('div', false, '', [], 'style="width: 300px; margin: 10px;"', [h3, img, p] );
insertedDivParent.setTag();
insertedDivParent.setStyles();

// insert tag-children in div
insertedDivParent.pushInsertedTag(h3.getHtml());
insertedDivParent.pushInsertedTag(img.getHtml());
insertedDivParent.pushInsertedTag(p.getHtml());



// 6. add div-parent (Wrapper)
let divWrapper = new HtmlElement('div', false, '', ['id="wrapper"'], 'style="display: flex;"', [insertedDivParent, insertedDivParent] ); // два вложенные тега в основного родителя - одинаковые 
divWrapper.setTag();
divWrapper.setAttributes();
divWrapper.setStyles();


// add inserted divs in div-wrapper
divWrapper.unshiftInsertedTag(insertedDivParent.getHtml());
divWrapper.unshiftInsertedTag(insertedDivParent.getHtml());
document.write(divWrapper.getHtml());







/* Task 3: Реализовать класс, который описывает css класс.
Класс CssClass должен содержать внутри себя:
■ название css класса;
■ массив стилей;
■ метод для установки стиля;
■ метод для удаления стиля;
■ метод getCss(), который возвращает css код в виде строки.*/
document.write(`<br><p style="${tasksColor}">Task 3:</p>`);

class CssClass {
    constructor(name, styles) {
        this.name = name;
        this.styles = styles;
        this.cssClassString = '';
    }
    updateStyles() {
        this.cssClassString = `.${this.name} { ` + this.styles.join(' ') + ' }';
    }
    setStyle(newStyle) {
        this.styles.push(newStyle);
        this.updateStyles();
    }
    removeStyle(styleIdx) {
        this.styles.splice(styleIdx, 1);
        this.updateStyles();
    }
    getCss() {
        this.updateStyles();
        return this.cssClassString;
    }
}

let cssClass = new CssClass('block', ['width: 150px;', 'height: 150px;']);

// 1. метод для установки стиля;
document.write(`Styles:<br>${cssClass.getCss()}<br><br>`); 
cssClass.setStyle('background-color: red;');
document.write(`Add background-color:<br>${cssClass.getCss()}<br><br>`);

// 2. метод для удаления стиля;
cssClass.removeStyle(1);
document.write(`Remove style with idx = 1:<br>${cssClass.getCss()}<br><br>`);





/* Task 4: Реализовать класс, описывающий блок html документ.
Класс HtmlBlock должен содержать внутри себя:
■ коллекцию стилей, описанных с помощью класса CssClass;
■ корневой элемент, описанный с помощью класса
HtmlElement;
■ метод getCode(), который возвращает строку с html кодом (сначала теги style с описанием всех классов, а потом
все html содержимое из корневого тега и его вложенных
элементов)...*/
document.write(`<br><p style="${tasksColor}">Task 4:</p>`);


// add styles 
let cssClassWrap = new CssClass('wrap', ['display: flex;']);
let cssClassBlock = new CssClass('block', ['width: 300px;', 'margim: 10px;']);
let cssClassImg = new CssClass('img', ['width: 100%;']);
let cssClassText = new CssClass('text', ['text-align: justify;']);

let tagStyle = new HtmlElement('style', false, cssClassWrap.getCss() + cssClassBlock.getCss() + cssClassImg.getCss() + cssClassText.getCss());
tagStyle.setTag();
tagStyle.setText();


// add html 
// возьмем готовые теги (h3, img, p) из задания №2

// 1. add inserted div-parent
let insertedDivParent2 = new HtmlElement('div', false, '', ['class="block"'], '', [h3, img, p] );
insertedDivParent2.setTag();
insertedDivParent2.setAttributes();

// insert tag-children in div
insertedDivParent2.pushInsertedTag(h3.getHtml());
insertedDivParent2.pushInsertedTag(img.getHtml());
insertedDivParent2.pushInsertedTag(p.getHtml());


// 2. add div-parent (Wrapper)
let tagDivWrapper = new HtmlElement('div', false, '', ['id="wrapper"', 'class="wrap"'], '', [insertedDivParent2, insertedDivParent2]);
tagDivWrapper.setTag();
tagDivWrapper.setAttributes();


// add inserted divs in div-wrapper
tagDivWrapper.unshiftInsertedTag(insertedDivParent2.getHtml());
tagDivWrapper.unshiftInsertedTag(insertedDivParent2.getHtml());
document.write(tagDivWrapper.getHtml());

document.write('<hr>');