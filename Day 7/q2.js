const fs = require('fs')

const input = fs.readFileSync('input.txt', { encoding: 'ascii' }).split('$')

var fileSystem = {}
var fpath = []

for (let i = 0; i < input.length; i++) {
    var lines = input[i].split('\n')
    var commandStr = lines.splice(0, 1)[0].trim().split(' ')
    var command = commandStr.splice(0, 1)[0]
    var args = commandStr

    switch (command) {
        case "cd":
            if (args[0] == '..') {
                fpath.pop()
            } else if (args[0] == '/') {
                fpath = ['']
            } else {
                fpath.push(args[0])
            }
            break;
        case "ls":
            const files = lines.map(t => t.split(' '))
                .map(([fls, ...fln]) =>
                    [fln.join(' '), fls])
                .filter(([n, t]) => t != 'dir')

            files.forEach(([n, s]) => {
                for (let i = 1; i <= fpath.length; i++) {
                    fileSystem[fpath.slice(0, i).join('/')] ??= 0
                    fileSystem[fpath.slice(0, i).join('/')] += Number(s)
                }
            })
    }
}

const total_disk_space = 70000000
const space_needed = 30000000
const space_available = total_disk_space - fileSystem['']
const space_to_free = space_needed - space_available

let best = 1e99
let ans = 0
for (const i in fileSystem) {
    if (fileSystem[i] >= space_to_free) {
        best = Math.min(fileSystem[i], best)
    }
    if (fileSystem[i] <= 100000) {
        ans+=fileSystem[i]
    }
}

console.log(best)