import { readFile } from 'node:fs/promises';
import { start } from 'node:repl';

const digitRegExGlobal = /\d+/g;
const digitRegEx = /\d+/;
const gearRegEx = /\*/g;

function extractPartNumberFromRow(row, digitIndex)
{
    digitIndex = Number(digitIndex);

    let partNumber = row[digitIndex];
    let startIndex = digitIndex - 1;
    let endIndex = digitIndex + 1;

    while (startIndex >= 0 && digitRegEx.test(row[startIndex])) {
        partNumber = row[startIndex] + partNumber;
        startIndex--;
    }

    while (endIndex < row.length && digitRegEx.test(row[endIndex])) {
        partNumber += row[endIndex];
        endIndex++;
    }

    return Number(partNumber);
}

function findPartNumbers(rowsToSearch, gearIndex)
{
    gearIndex = Number(gearIndex);
    let partNumbers = [];

    for (const row of rowsToSearch) {
        const searchArea = row.substring(gearIndex - 1, gearIndex + 2);
        for (const numberMatch of searchArea.matchAll(digitRegExGlobal)) {
            partNumbers.push(extractPartNumberFromRow(row, ((gearIndex - 1) + numberMatch.index)));
        }
    }
    return partNumbers;
}


let input = (await readFile('day3.input.txt')).toString().split('\n');
let sum = 0;

for (let x in input) {
    x = Number(x);

    for (let gearMatch of input[x].matchAll(gearRegEx)) {
        let rowsToSearch = [input[x]];

        if (x > 0) {
            rowsToSearch.unshift(input[x - 1]);
        }

        if (x <= (input.length - 1)) {
            rowsToSearch.push(input[x + 1]);
        }

        const partNumbers = findPartNumbers(rowsToSearch, gearMatch.index);
        if (partNumbers.length == 2) {
            sum += (partNumbers[0] * partNumbers[1]);
        }
    }
}

console.log(sum);