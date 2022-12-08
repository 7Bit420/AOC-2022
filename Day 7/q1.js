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

let o = 0

for (const i in fileSystem) {
    if (fileSystem[i] <= 100000) {
        o+=fileSystem[i]
    }
}

console.log(o)
