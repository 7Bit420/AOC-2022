const fs = require('fs')

var input = fs.readFileSync('input.txt', { encoding: 'ascii' }).split('\n\n')

var crates = input[0].split('\n')
var crateGrid = [['']]

crates.pop()

for (let x = 0; x < 9; x++) {
    crateGrid[x] = []
}

crates.forEach(t => {
    for (let i = 0; i < t.length; i += 4) {
        var crate = t.substring(i, i + 3).trim()
        if (crate != '') {
            crateGrid[i / 4].unshift(crate[1])
        }
    }
})

// move {a} from {b} to {c}
var commands = input[1]
    .split('\n')
    .map(t => t.split(' ')
    ).map(([, a, , b, , c]) => [
        Number(a),
        Number(b) - 1,
        Number(c) - 1
    ])

function gridToString(grid) {
    var str = ''
    for (let i = 20; i >= 0; i--) {
        for (let x = 0; x < 9; x++) {
            if (grid[x]?.[i]) {
                str += `[${grid[x]?.[i]}] `
            } else {
                str += '    '
            }
        }
        str += '\n'
    }
    str+=' 1   2   3   4   5   6   7   8   9  '
    return str
}

console.log(gridToString(crateGrid))

commands.forEach(c => {
    for (let i = 0; i < c[0]; i++) {
        var items = crateGrid[c[1]].splice(-1, c[0])
        crateGrid[c[2]].push(...items)
    }
})

console.log(gridToString(crateGrid))
console.log(crateGrid.map(t => t.at(-1)).join(''))