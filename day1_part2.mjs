import { readFile } from 'node:fs/promises';

const digitConversion = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
};

const input = (await readFile('day1.input.txt')).toString().split('\n');
let sum = 0;

for (let line of input) {
    let firstDigit = null;
    let lastDigit = null;
    let indexOfFirstDigit = null;
    let indexOfLastDigit = null;

    for (let word in digitConversion) {
        const firstWordIndex = line.indexOf(word);
        const lastWordIndex = line.lastIndexOf(word);
        const firstDigitIndex = line.indexOf(digitConversion[word]);
        const lastDigitIndex = line.lastIndexOf(digitConversion[word]);

        if (firstWordIndex >= 0 && (indexOfFirstDigit === null || firstWordIndex < indexOfFirstDigit)) {
            indexOfFirstDigit = firstWordIndex;
            firstDigit = digitConversion[word];
        }

        if (lastWordIndex >= 0 && (indexOfLastDigit === null || lastWordIndex > indexOfLastDigit)) {
            indexOfLastDigit = lastWordIndex;
            lastDigit = digitConversion[word];
        }

        if (firstDigitIndex >= 0 && (indexOfFirstDigit === null || firstDigitIndex < indexOfFirstDigit)) {
            indexOfFirstDigit = firstDigitIndex;
            firstDigit = digitConversion[word];
        }

        if (lastDigitIndex >=0 && (indexOfLastDigit === null || lastDigitIndex > indexOfLastDigit)) {
            indexOfLastDigit = lastDigitIndex;
            lastDigit = digitConversion[word];
        }
    }

    sum += Number(firstDigit + lastDigit);
}

console.log(sum);