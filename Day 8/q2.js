const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'ascii' })
const map = input.split('\n').map(t => Array.from(t).map(t => Number(t)))
const outMap = (new Array(map.length))
    .fill(undefined)
    .map(() => (new Array(input[0].length)).fill(0));

function senicUp(x, y) {
    var socre = 0
    for (let dy = y - 1; dy > 0; dy--) {
        socre++;
        if (map[dy][x] >= map[y][x]) {
            break
        }
    }
    return socre
}
function senicDown(x, y) {
    var socre = 0
    for (let dy = y + 1; dy < map.length; dy++) {
        socre++;
        if (map[dy][x] >= map[y][x]) {
            break
        }
    }
    return socre
}
function senicLeft(x, y) {
    var socre = 0
    for (let dx = x - 1; dx > 0; dx--) {
        socre++;
        if (map[y][dx] >= map[y][x]) {
            break
        }
    }
    return socre
}
function senicRight(x, y) {
    var socre = 0
    for (let dx = x + 1; dx < map[y].length; dx++) {
        socre++;
        if (map[y][dx] >= map[y][x]) {
            break
        }
    }
    return socre
}

/**
 * @param {number} x 
 * @param {number} y 
 */
function senicScore(x, y) {
    return (
        senicUp(x, y) *
        senicDown(x, y) *
        senicLeft(x, y) *
        senicRight(x, y)
    )
}

/**
 * @param {number} x 
 * @param {number} y 
 */
function senicScores(x, y) {
    return [
        senicUp(x, y),
        senicDown(x, y),
        senicLeft(x, y),
        senicRight(x, y)
    ]
}

var crntHighestScore = 0
var [mx, my] = [0, 0]

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        var score = senicScore(x, y)
        if (crntHighestScore < score) {
            crntHighestScore = score
            my = y
            mx = x
        }
    }
}

console.log(crntHighestScore)
