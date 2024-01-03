import { readFile } from 'node:fs/promises';

const raceTimeRegex = /Time:.*/m;
const raceRecordRegex = /Distance:.*/m;
const numberRegex = /\d+/g;

const input = (await readFile('day6.input.txt')).toString();
let output = 0;

const raceTimeMatch = input.match(raceTimeRegex);
const raceRecordMatch = input.match(raceRecordRegex);

if (raceTimeMatch && raceRecordMatch) {
    const raceTime = Number([...raceTimeMatch[0].matchAll(numberRegex)].reduce((acc, val) => acc + val));
    const raceRecord = Number([...raceRecordMatch[0].matchAll(numberRegex)].reduce((acc, val) => acc + val));

    for (let buttonHoldTime = 0; buttonHoldTime <= raceTime; buttonHoldTime++) {
        const speed = buttonHoldTime;
        const travelTime = raceTime - buttonHoldTime;
        const travelDistance = speed * travelTime;

        if (travelDistance > raceRecord) {
            output++;
        }
    }
}

console.log(output);