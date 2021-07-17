document.write(`<h1 style="${tasksColor}">Home work 2:</h1>`);

/* Task 1: Реализовать класс, описывающий простой маркер. В классе
должны быть следующие компоненты:
■ поле, которое хранит цвет маркера;
■ поле, которое хранит количество чернил в маркере (в процентах);
■ метод для печати (метод принимает строку и выводит
текст соответствующим цветом; текст выводится до тех
пор, пока в маркере есть чернила; один не пробельный
символ – это 0,5% чернил в маркере).
Реализовать класс, описывающий заправляющийся маркер,
унаследовав его от простого маркера и добавив метод для заправки
маркера.
Продемонстрировать работу написанных методов. */
document.write(`<p style="${tasksColor}">Task 1:</p>`);

class Marker {
    constructor(color, inkCount) {
        this.color = color;
        this.inkCount = inkCount;
    }
    print(text) {
        let resultStr = '';
        for(let i = 0; i < text.length; i++) {
            if(text[i] != ' ') {
                this.inkCount -= 0.5;
            }
            if(this.inkCount < 0) {
                break;
            }
            resultStr += text[i];
        }
        document.write(`<p style="color: ${this.color};">${resultStr}<p>`)
    }
}

let marker = new Marker('cyan', 2);
marker.print('H e l lo world!');



class SelfRefillMarker extends Marker {
    reFill(amount) {
        this.inkCount += amount;
        if(this.inkCount > 100) {
            this.inkCount = 100;
        }
        else if(this.inkCount < 0) {
            this.inkCount = 0;
        }
    }
}

let selfRefillMarker = new SelfRefillMarker('blue', 4);
selfRefillMarker.print('Hello world!');
selfRefillMarker.reFill(10);
selfRefillMarker.print('Hello world!');



/* Task 2: Реализуйте класс ExtendedDate, унаследовав его от стандартного класса Date и добавив следующие возможности:
■ метод для вывода даты (числа и месяца) текстом; + 
■ метод для проверки – это прошедшая дата или будущая + 
(если прошедшая, то метод возвращает false; если будущая или текущая, то true); + 
■ метод для проверки – високосный год или нет;
■ метод, возвращающий следующую дату.
Создайте объект класса ExtendedDate и выведите на экран
результаты работы новых методов. */
document.write(`<p style="${tasksColor}">Task 2:</p>`);

class ExtendedDate extends Date {
    showDateString() {
        let lastDotIdx = this.toLocaleDateString().lastIndexOf('.');
        document.write(this.toLocaleDateString().substr(0, lastDotIdx)); 
    }
    isFutureDate() {
        if(this >= new Date()) {
            return true;
        }
        else{
            return false;
        }
    }
    checkYear() {
        let year = this.getFullYear()
        if (year % 4 == 0 && ( year % 100 != 0 || year % 400 == 0)) {
            document.write('Leap year');
        }
        else {
            document.write('Not leap year');
        }
    }
    getNextDate() {
        let date = this;
        date.setDate(this.getDate() + 1);
        document.write(`Next day date: ${date.toLocaleDateString()}`);
    }
}

let date = new ExtendedDate('2021-05-31');

// метод для вывода даты (числа и месяца) текстом;
date.showDateString();
// метод для проверки – это прошедшая дата или будущая
document.write(`<br>Is Future Date - ${date.isFutureDate()}<br>`);
// метод для проверки – високосный год или нет;
date.checkYear();
// метод, возвращающий следующую дату.
date.getNextDate();





// Task 3: Реализовать класс Employee, описывающий работника, и создать массив работников банка.
// Реализовать класс EmpTable для генерации html кода таблицы
// со списком работников банка. Массив работников необходимо
// передавать через конструктор, а получать html код с помощью
// метода getHtml().
// Создать объект класса EmpTable и вывести на экран результат
// работы метода getHtml().
document.write(`<br><p style="${tasksColor}">Task 3:</p>`);

class Employee {
    constructor(fullName, salary, position) {
        this.fullName = fullName;
        this.salary = salary;
        this.position = position;
    }
}

class EmpTable {
    // #tableStyle = 'style="border-collapse: collapse;"';
    // #tdStyles = 'style="width: 200px; height:60px; border: solid 1px silver; text-align:center;"';
    constructor(employes) {
        this.employes = employes;
    }
    getHtml() {
        let res = `<table>`;
        for(let i = 0; i < this.employes.length; i++) {
            res += `<tr>
                        <td>${this.employes[i].fullName}</td>
                        <td>${this.employes[i].salary}</td>
                        <td>${this.employes[i].position}</td>
                    </tr>`;
        } 
        res += '</table>';
        return res;
    }
}
// ${this.#tableStyle}
// ${this.#tdStyles}
// ${this.#tdStyles}
// ${this.#tdStyles}

let employes = [
    new Employee('Ivan Fedorov', 15_000, 'manager'),
    new Employee('Masha Sydorove', 10_000, 'layer'),
    new Employee('Sergey Safonov', 20_000, 'electrician')
];
let empTable = new EmpTable(employes);
document.write('<br>Table without styles:<br><br>');
document.write(empTable.getHtml());





// Task 4: Реализовать класс StyledEmpTable, который наследуется от
// класса EmpTable. Добавить метод getStyles(), который возвращает
// строку со стилями для таблицы в тегах style. Переопределить
// метод getHtml(), который добавляет стили к тому, что возвращает
// метод getHtml() из родительского класса.
// Создать объект класса StyledEmpTable и вывести на экран
// результат работы метода getHtml().
document.write(`<p style="${tasksColor}">Task 4:</p>`);

String.prototype.insertAfter = function(someSubStr, insertion, startFindPosition = 0) {
    let idxStart = this.indexOf(someSubStr, startFindPosition);
    let idxEnd = idxStart + someSubStr.length;
    let part1 = this.substr(0, idxEnd);
    let part2 = this.substr(idxEnd);
    return part1 + insertion + part2;
}

class StyledEmpTable extends EmpTable {
    getTableStyles() {
        return 'style="border-collapse: collapse;"';
    }
    getTdStyles() {
        return 'style="width: 200px; height:60px; border: solid 1px silver; text-align:center;"';
    }
    getHtml() {
        let tableHtml = super.getHtml();
        // add styles to tag table
        tableHtml = tableHtml.insertAfter('<table', ' ' + this.getTableStyles());

        // add styles to tag td
        let target = '<td'; // цель поиска

        let pos = 0;
        while (true) {
          let foundPos = tableHtml.indexOf(target, pos);
          if (foundPos == -1) break;

          tableHtml = tableHtml.insertAfter(target, ' ' + this.getTdStyles(), foundPos);
          pos = foundPos + 1; // продолжаем со следующей позиции
        }
        return tableHtml;
    }
}

let styledEmpTable = new StyledEmpTable(employes);
document.write('<br>Table with styles:<br><br>');
document.write(styledEmpTable.getHtml());

