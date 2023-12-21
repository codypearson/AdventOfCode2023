import { readFile } from 'node:fs/promises';

let input = (await readFile('day1.input.txt')).toString().split('\n');
let sum = 0;

for (let line of input) {
    let firstDigit = null;
    let lastDigit = null;

    for (let index = 0; index < line.length; index++) {
        if (/[0-9]/.test(line[index])) {
            lastDigit = line[index];
            if (firstDigit === null) {
                firstDigit = line[index];
            }
        }
    }

    sum += Number(firstDigit + lastDigit);
}

console.log(sum);