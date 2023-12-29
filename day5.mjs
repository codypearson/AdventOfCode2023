import { readFile } from 'node:fs/promises';

const seedListRegEx = /seeds:(?<seeds>[\s\d]+)/;
const mapRegEx = /map:\n(?<mapLines>[\s\d\n]+)/gm;
const numberRegEx = /\d+/g;
const mapLineRegEx = /(?<destRangeStart>\d+)\s+(?<sourceRangeStart>\d+)\s+(?<rangeLength>\d+)/g;

let input = (await readFile('day5.input.txt')).toString();

let seedList = [...seedListRegEx.exec(input).groups.seeds.matchAll(numberRegEx)].map((seedMatch) => seedMatch[0]);
const mapList = [...input.matchAll(mapRegEx)].map((mapMatch) => [...mapMatch.groups.mapLines.matchAll(mapLineRegEx)].map((mapLineMatch) => mapLineMatch.groups));

for (const map of mapList) {
    seedList = seedList.map((seed) => {
        for (const mapRange of map) {
            const destRangeStart = Number(mapRange.destRangeStart);
            const sourceRangeStart = Number(mapRange.sourceRangeStart);
            const rangeLength = Number(mapRange.rangeLength);

            if (seed >= sourceRangeStart && seed < (sourceRangeStart + rangeLength)) {
                return destRangeStart + (seed - sourceRangeStart);
            }
        }

        return seed;
    });
}

console.log(Math.min(...seedList));