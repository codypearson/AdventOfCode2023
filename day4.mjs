import { readFile } from 'node:fs/promises';

const cardRegEx = /^Card\s+(?<cardId>\d+):(?<winningNumbers>[\s\d]+)\|(?<numbersOnCard>[\s\d]+)$/;
const numberRegEx = /\d+/g;

let input = (await readFile('day4.input.txt')).toString().split('\n');
let totalScore = 0;

for (const card of input) {
    let winCount = 0;

    const cardMatch = cardRegEx.exec(card);
    if (cardMatch) {
        const winningNumbers = [...cardMatch.groups.winningNumbers.matchAll(numberRegEx)].map((numMatch => numMatch[0]));

        for (const numberOnCard of cardMatch.groups.numbersOnCard.matchAll(numberRegEx)) {
            if (winningNumbers.includes(numberOnCard[0])) {
                winCount++;
            }
        }

        if (winCount > 0) {
            totalScore += 2 ** (winCount - 1);
        }
    }
}

console.log(totalScore);