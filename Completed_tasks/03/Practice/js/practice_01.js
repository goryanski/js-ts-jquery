'use strict';
const tasksColor = 'color: red;';
const tasksItemsColor = 'color: green;';

document.write(`<h1 style="${tasksColor}">Practice 1:</h1>`);
// Task 1: Реализовать класс PrintMaсhine...
document.write(`<p style="${tasksColor}">Task 1:</p>`);
class PrintMaсhine {
    constructor(fontSize, fontColor, fontFamily) {
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.fontFamily = fontFamily;
    }
    print(text) {
        document.write(`<p style="font-size: ${this.fontSize}; color: ${this.fontColor}; font-family: ${this.fontFamily}">${text}</p>`)
    }
}

let printMaсhine = new PrintMaсhine('22px', 'blue', 'Arial, Helvetica, sans-serif');

printMaсhine.print('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.')




// Task 2: Реализовать класс, описывающий новость (заголовок, текст,
// массив тегов, дата публикации). В классе необходимо реализовать
// один метод print, который выводит всю информацию в таком
// виде, как на рисунке 1 ...
document.write(`<p style="${tasksColor}">Task 2:</p>`);

const dayInSeconds = 86400;
class News {
    #dateFontSize = 'font-size: 0.8em;';
    constructor(header, text, tags, publishDate) {
        this.header = header;
        this.text = text;
        this.tags = tags;
        this.publishDate = publishDate;
    }
    print() {
        document.write(`<h1>${this.header}</h1>`);
        
        let secondsPastAfterPublish = this.getDatesDifferentInSeconds(this.publishDate);
        // less than 1 day
        if(secondsPastAfterPublish < dayInSeconds) {
            document.write(`<p style="${this.#dateFontSize}">Today</p>`);
        }
        // less than 1 week
        else if (secondsPastAfterPublish > dayInSeconds && secondsPastAfterPublish < (dayInSeconds * 7)) {
            let countDays = secondsPastAfterPublish / dayInSeconds;
            document.write(`<p style="${this.#dateFontSize}">${Math.floor(countDays)} days ago</p>`);
        }
        // «дд.мм.гггг»
        else {
            document.write(`<p style="${this.#dateFontSize}">${new Date(this.publishDate).toLocaleDateString()}</p>`);
        }
        
        
        document.write(`<p>${this.text}</p>`);
        document.write(`<p>${this.tags.join(' ')}</p>`);
    }

    getDatesDifferentInSeconds(date) {
        return (new Date().getTime() - new Date(date).getTime()) / 1000;
    }
}

let news = new News('What is Lorem?', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.', ['#lorem', '#ipsum', '#text'], '2021-05-19');

news.print();




/* Task 3: Реализовать класс, описывающий новостную ленту.
Класс должен содержать:
■ массив новостей; +
■ get-свойство, которое возвращает количество новостей; +
■ метод для вывода на экран всех новостей; +
■ метод для добавления новости; +
■ метод для удаления новости; +
■ метод для сортировки новостей по дате (от последних новостей до старых);
■ метод для поиска новостей по тегу (возвращает массив
новостей, в которых указан переданный в метод тег).
Продемонстрировать работу написанных методов. */
document.write(`<br><p style="${tasksColor}">Task 3:</p>`);

class NewsFeed {
    constructor (newsArr) {
        this.newsArr = newsArr;
    }
    get countNews() {
        return this.newsArr.length;
    }
    printAllNews() {
        this.newsArr.forEach(item => item.print());
    }
    createNews(news) {
        this.newsArr.push(news);
    }
    deleteNews(newsNumberToDelete) {
        let newsIdxToDelete = newsNumberToDelete - 1;
        if(this.countNews == 0) {
            document.write('Nothing to delete');
        }
        else if(newsIdxToDelete < 0 || newsIdxToDelete > (this.countNews - 1)) {
            document.write('Wrong news number');
        }
        else {
            this.newsArr.splice(newsIdxToDelete, 1);
            document.write('News has been deleted');
        }
    }
    sortNews() {
        this.newsArr.sort((a, b) => a.publishDate > b.publishDate ? -1 : 1);
    }
    searchNewsByTag(srchTag) {
        let suitableNews = [];
        for(let i = 0; i < this.newsArr.length; i++) {
            if(this.newsArr[i].tags.find(item => item === srchTag)) {
                suitableNews.push(this.newsArr[i]);
            }
        }
        if(suitableNews.length > 0) {
            suitableNews.forEach(item => item.print());
        }
        else {
            document.write('There are no news by this tag');
        }
    }
}

let newsArr = [
    new News('What is Lorem?', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.', ['#lorem', '#ipsum', '#text'], '2021-05-19'),
    new News('What is ipsum dolor?', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.', ['#dolor', '#ipsum'], '2021-05-29'),
    new News('What is libero illum?', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.', ['#libero', '#illum'], '2021-05-28')
];

let newsFeed = new NewsFeed(newsArr);

// get-свойство, которое возвращает количество новостей;
document.write(`<p style="${tasksItemsColor}">1) Count news: ${newsFeed.countNews}</p>`);

// метод для вывода на экран всех новостей;
document.write(`<p style="${tasksItemsColor}">2) Print all news:</p>`);
newsFeed.printAllNews();

// метод для добавления новости;
document.write(`<br><p style="${tasksItemsColor}">3) Create news:</p>`);
let newNews = new News('What is beatae incidunt?', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, eligendi natus nesciunt veniam perferendis similique deserunt, beatae incidunt, provident enim excepturi libero illum sapiente hic. Quis dicta unde quod eveniet.', ['#beatae', '#incidunt'], '2021-05-25');
newsFeed.createNews(newNews);
document.write(`<p> New count of news: ${newsFeed.countNews}</p>`);

// метод для удаления новости;
document.write(`<br><p style="${tasksItemsColor}">4) Delete news:</p>`);
newsFeed.deleteNews(2);

// метод для сортировки новостей по дате (от последних новостей до старых);
document.write(`<br><br><p style="${tasksItemsColor}">5) Sort news:</p>`);
document.write(`<p style="${tasksItemsColor}">News before sort:</p>`);
newsFeed.printAllNews();
newsFeed.sortNews();
document.write(`<br><p style="${tasksItemsColor}">News after sort:</p>`);
newsFeed.printAllNews();

// метод для поиска новостей по тегу
document.write(`<br><br><p style="${tasksItemsColor}">6) Search news by tag:</p>`);
newsFeed.searchNewsByTag('#illum');

document.write('<hr>');
