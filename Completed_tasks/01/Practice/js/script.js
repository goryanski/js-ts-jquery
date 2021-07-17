'use strict';
/* 1. Создайте функцию stringFrom(…), возвращающую
строку, состоящую из значений всех переданных
аргументов. Например, вызов stringFrom('I have', 5,
'apples') вернет строку «I have 5 apples»; вызов stringFrom('Х value is', true) вернет строку «Х value is true».*/
// function stringFrom(...args) {
//     let str = '';
//     args.forEach((item) => {
//         str += (item + ' ');
//     });
//     return str;
// }
// let res = stringFrom('I have', 5, 'apples');
// //res = stringFrom('Х value is', true)
// console.log(res);



/* 2. Создайте функцию, возвращающую значение минимального из всех переданных аргументов.*/
// function findMin(...args) {
//     let min = args[0];
//     args.forEach((item) => {
//         if(item < min) {
//             min = item
//         }
//     });
//     console.log(min);
// }
// findMin(5, 3, 9, 7, 2);


/* 3. Создайте функцию numbers(), которая будет подсчитывать количество переданных числовых аргументов.
Например, numbers(1, 2, “a”) вернет значение 2, numbers(true, 2, false) — 1, numbers() — 0. */
// function countNumbers(...args) {
//     let count = 0;
//     args.forEach((item) => {
//         if(Number.isInteger(item)) {
//             count++;
//         }
//     });
//     console.log(count);
// }
// countNumbers(5, 3, 9, 'apple', 'room', true, 9, 3);


/* 4. Создайте функцию mean(), которая рассчитает среднее значение от всех числовых аргументов, игнорируя
аргументы нечислового типа. Например, mean (1, 2,
“a”) вернет значение 1.5 (среднее 1 и 2), mean(true, 2,
false) — 2, mean() — 0. */
// function showAvg(...args) {
//     let sum = 0;
//     let countNumbers = 0;
//     args.forEach((item) => {
//         if(Number.isInteger(item)) {
//             sum += item
//             countNumbers++;
//         }
//     });
//     if(sum != 0) {
//         console.log(sum / countNumbers);
//     }
//     else {
//         console.log('No numbers');
//     }
// }
// showAvg(5, 3, 4, 'apple', 'room', true);


/* 5. Напишите рекурсивную функцию, которая проверяет,
является ли переданный аргумент степенью двойки
(например, числа 8=23
, 32=25
 — это степени двойки,
а числа 7 или 12 — нет). Подсказка: если число «х» делится на два, то нужно проверить, является ли число
«х/2» степенью двойки. */
// function showPow(value) {
//     if(Number.isInteger(value)){
//         if(value === 2) {
//             console.log('true')
//         }
//         else if(value % 2 != 0) {
//             console.log('false')
//         }
//         else {
//             showPow(value/2);
//         }
//     }
//     else{
//         console.log('Value is not a number')
//     }
// }
// showPow(8);
// showPow(32);
// showPow(7);
// showPow(12);


/* 6. Напишите рекурсивную функцию, которая выводит
число N «справа налево», то есть последняя цифра
числа становится первой, предпоследняя — второй
и т.д. (например, ввод N=123, вывод 321; ввод N= 12,
вывод 21). Обеспечьте ввод пользователем числа
N и вывод его «справа налево» вызовом функции.
Подсказка: последняя цифра числа «х» это остаток
от деления на 10 (х%10), а остальные цифры можно
отделить, поделив «х» на 10 нацело (parseInt(х/10)). */
// function showReverseNumber(value, res) {
//     if(Number.isInteger(value)){
//         if(value >= 10) {
//             res += String(value % 10);
//             showReverseNumber(parseInt(value / 10), res);
//         }
//         else {
//             res += String(value);
//             console.log(res);
//         }
//     }
//     else {
//         console.log('Value is not a number')
//     }
// }
// let value = prompt('Enter your number');
// let res = '';
// showReverseNumber(Number(value), res);