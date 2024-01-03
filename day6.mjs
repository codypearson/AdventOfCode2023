import { readFile } from 'node:fs/promises';

const raceTimeRegex = /Time:.*/m;
const raceRecordRegex = /Distance:.*/m;
const numberRegex = /\d+/g;

const input = (await readFile('day6.input.txt')).toString();
let output = 1;

const raceTimeMatch = input.match(raceTimeRegex);
const raceRecordMatch = input.match(raceRecordRegex);

if (raceTimeMatch && raceRecordMatch) {
    const raceTimes = [...raceTimeMatch[0].matchAll(numberRegex)].map((raceTimeMatch) => Number(raceTimeMatch[0]));
    const raceRecords = [...raceRecordMatch[0].matchAll(numberRegex)].map((raceRecordMatch) => Number(raceRecordMatch[0]));

    for (const raceId in raceTimes) {
        let winPossibilities = 0;

        for (let buttonHoldTime = 0; buttonHoldTime <= raceTimes[raceId]; buttonHoldTime++) {
            const speed = buttonHoldTime;
            const travelTime = raceTimes[raceId] - buttonHoldTime;
            const travelDistance = speed * travelTime;

            if (travelDistance > raceRecords[raceId]) {
                winPossibilities++;
            }
        }

        output *= winPossibilities;
    }
}

console.log(output);