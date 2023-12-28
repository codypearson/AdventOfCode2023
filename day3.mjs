import { readFile } from 'node:fs/promises';
import { start } from 'node:repl';

const digitRegEx = /\d+/dg;
const symbolRegEx = /[^\d.]/;

function searchRowsForSymbol(numberStartIndex, numberEndIndex, rows)
{
    let symbolFound = false;

    numberStartIndex = Number(numberStartIndex);
    numberEndIndex = Number(numberEndIndex);

    rowLoop: {
        for (const row of rows) {
            const searchArea = row.substring(numberStartIndex - 1, numberEndIndex + 1);
            if (symbolRegEx.test(searchArea)) {
                symbolFound = true;
                break rowLoop;
            }
        }
    }

    return symbolFound;
}

let input = (await readFile('day3.input.txt')).toString().split('\n');
let sum = 0;


inputLoop: {
    for (let x in input) {
        x = Number(x);
        console.log('Line', x + 1);

        numberLoop: {
            for (const numberMatch of input[x].matchAll(digitRegEx)) {
                console.log('Found number', numberMatch[0], 'at', numberMatch.indices[0]);
                let rowsToSearch = [input[x]];
                if (x > 0) {
                    rowsToSearch.unshift(input[x - 1]);
                }

                if (x < (input.length - 1)) {
                    rowsToSearch.push(input[x + 1]);
                }

                if (searchRowsForSymbol(numberMatch.indices[0][0], numberMatch.indices[0][1], rowsToSearch)) {
                    sum += Number(numberMatch[0]);
                }
            }
        }
    }
}

console.log(sum);