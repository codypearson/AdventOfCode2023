import { readFile } from 'node:fs/promises';

let input = (await readFile('day2.input.txt')).toString().split('\n');

let sum = 0;

lineLoop: {
    for (let line of input) {
        const allRoundsMatch = line.match(/(?<=:\s+)\d.*$/);

        let maximums = {
            red: 0,
            green: 0,
            blue: 0
        };

        if (allRoundsMatch !== null) {
            const roundsText = allRoundsMatch[0];

            roundLoop: {
                for (let roundText of roundsText.split(';')) {
                    cubeLoop: {
                        for (let cubeDef of roundText.split(',')) {
                            const parsedCube = cubeDef.match(/(?<count>\d+)\s+(?<color>\w+)/);
                            if (parsedCube !== null && parsedCube.groups.count > maximums[parsedCube.groups.color]) {
                                maximums[parsedCube.groups.color] = Number(parsedCube.groups.count);
                            }
                        }
                    }
                }
            }

            let power = 1;
            powerLoop: {
                for (let count of Object.values(maximums)) {
                    power *= count;
                }
            }

            sum += power;
        }
    }
}

console.log(sum);