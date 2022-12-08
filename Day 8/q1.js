const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'ascii' })
const map = input.split('\n').map(t => Array.from(t).map(t => Number(t)))
const outMap = (new Array(map.length))
    .fill(undefined)
    .map(() => (new Array(input[0].length)).fill(0));

let visable = (map[0].length * 2) + (map.length * 2) - 4

/**
 * @param {number} x 
 * @param {number} y 
 */
function isVisable(x, y) {
    var treeHeight = map[y][x]
    var visiableSides = 4
    for (let dy = 0; dy < y; dy++) {
        if (map[dy][x] >= treeHeight) {
            // console.log(`1 | ${x}:${y} (${treeHeight}) found at ${dy}:${x} (${map[dy][x]})`)
            visiableSides--;
            break
        }
    }
    for (let dx = 0; dx < x; dx++) {
        if (map[y][dx] >= treeHeight) {
            // console.log(`2 | ${x}:${y} (${treeHeight}) found at ${y}:${dx} (${map[y][dx]})`)
            visiableSides--;
            break
        }
    }
    for (let dy = map.length - 1; dy > y; dy--) {
        if (map[dy][x] >= treeHeight) {
            // console.log(`3 | ${x}:${y} (${treeHeight}) found at ${dy}:${x} (${map[dy][x]})`)
            visiableSides--;
            break
        }
    }
    for (let dx = map[y].length - 1; dx > x; dx--) {
        if (map[y][dx] >= treeHeight) {
            // console.log(`4 | ${x}:${y} (${treeHeight}) found at ${y}:${dx} (${map[y][dx]})`)
            visiableSides--;
            break
        }
    }
    if (visiableSides > 0) {
        return true
    } else {
        // console.log(`5 | ${x}:${y} (${treeHeight}) not found`)
        return false
    }
}


for (let y = 1; y < (map.length - 1); y++) {
    for (let x = 1; x < (map[y].length - 1); x++) {
        if (isVisable(x, y)) { visable++ }
    }
}


console.log(map, visable, isVisable(2, 2))

/**
 * INNCROECT VALUES
 * 3557
 */