import { readFile } from 'node:fs/promises';

const seedListRegEx = /seeds:(?<seeds>[\s\d]+)/;
const mapRegEx = /map:\n(?<mapLines>[\s\d\n]+)/gm;
const seedRangeRegEx = /(?<rangeStart>\d+)\s+(?<rangeLength>\d+)/g;
const mapLineRegEx = /(?<destRangeStart>\d+)\s+(?<sourceRangeStart>\d+)\s+(?<rangeLength>\d+)/g;

function traverseMaps(maps, targetValue)
{
    // Clone the maps array so the original is preserved
    maps = maps.slice();

    let map = maps.pop();
    if (map === undefined) {
        return targetValue;
    } else {
        for (const rangeDef of map) {
            if (targetValue >= rangeDef.destRangeStart && targetValue < (rangeDef.destRangeStart + rangeDef.rangeLength)) {
                const offset = targetValue - rangeDef.destRangeStart;

                return traverseMaps(maps, (rangeDef.sourceRangeStart + offset));
            }
        }

        return traverseMaps(maps, targetValue);
    }
}

function seedInRange(seeds, target)
{
    for (const seedDef of seeds) {
        if (target >= seedDef.rangeStart && target < (seedDef.rangeStart + seedDef.rangeLength)) {
            return true;
        }
    }

    return false;
}

let input = (await readFile('day5.input.txt')).toString();

const seedList = [...seedListRegEx.exec(input).groups.seeds.matchAll(seedRangeRegEx)].map((seedMatch) => {
    return Object.fromEntries(Object.entries(seedMatch.groups).map((seedDef) => {
        seedDef[1] = Number(seedDef[1]);
        return seedDef;
    }));
});
const mapList = [...input.matchAll(mapRegEx)].map((mapMatch) => [...mapMatch.groups.mapLines.matchAll(mapLineRegEx)].map((mapLineMatch) => {
    return Object.fromEntries(Object.entries(mapLineMatch.groups).map((mapRangeMatch) => {
        mapRangeMatch[1] = Number(mapRangeMatch[1]);
        return mapRangeMatch;
    }));
}).sort((a,b) => {
    if (a.destRangeStart < b.destRangeStart) {
        return -1;
    } else if (a.destRangeStart == b.destRangeStart) {
        return 0;
    } else {
        return 1;
    }
}));

let locationCandidate = 0;
let seedNumber;
let seedInLocation = false;

do {
    seedNumber = traverseMaps(mapList, locationCandidate);
    seedInLocation = seedInRange(seedList, seedNumber);
    if (!seedInLocation) {
        locationCandidate++;
    }
} while (!seedInLocation);

console.log(locationCandidate);