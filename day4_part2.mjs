import { readFile } from 'node:fs/promises';

const cardRegEx = /^Card\s+(?<cardId>\d+):(?<winningNumbers>[\s\d]+)\|(?<numbersOnCard>[\s\d]+)$/;
const numberRegEx = /\d+/g;

let input = (await readFile('day4.input.txt')).toString().split('\n');
let cardCounts = {};

inputLoop: {
    for (let line in input) {
        line = Number(line);

        const cardMatch = cardRegEx.exec(input[line]);
        if (cardMatch) {
            if (cardCounts.hasOwnProperty(line)) {
                cardCounts[line]++;
            } else {
                cardCounts[line] = 1;
            }

            const winningNumbers = [...cardMatch.groups.winningNumbers.matchAll(numberRegEx)].map((numMatch => numMatch[0]));
            let lineOfCardToAdd = line;

            cardNumberLoop: {
                for (const numberOnCard of cardMatch.groups.numbersOnCard.matchAll(numberRegEx)) {
                    if (winningNumbers.includes(numberOnCard[0])) {
                        lineOfCardToAdd++;
                        if (lineOfCardToAdd < input.length) {
                            if (cardCounts.hasOwnProperty(lineOfCardToAdd)) {
                                cardCounts[lineOfCardToAdd] += cardCounts[line];
                            } else {
                                cardCounts[lineOfCardToAdd] = cardCounts[line];
                            }
                        } else {
                            break cardNumberLoop;
                        }
                    }
                }
            }
        }
    }
}

console.log(Object.values(cardCounts).reduce((acc, val) => acc + val));