const fs = require('fs')
const path = require('path')

const input = fs.readFileSync('input.txt', { encoding: 'ascii' }).split('$')

var fpath = ""
var fileSystem = new Map()
var dirs = []

class directory {

    subDirs = new Map()
    files = new Map()
    contents = new Map()
    size = 0
    path = ""
    /**
     * @param {string} inTXT
     * @param {string} path
     */
    constructor(inTXT, path) {
        this.subDirs = new Map()
        this.files = new Map()
        this.contents = new Map()
        this.size = 0
        this.path = path
        inTXT.split('\n').forEach(t => {
            var fileStr = t.split(' ')
            var fileSize = fileStr.splice(0, 1)
            if (fileSize == 'dir') {
                this.contents.set(fileStr.join(' '), 'dir')
                return
            }
            this.size += Number(fileSize)
            this.contents.set(fileStr.join(' '), 'file')
            this.files.set(fileStr.join(' '), Number(fileSize))
        })
    }

    initSubDirs() {
        var subdirs = dirs
            .filter(t => (
                t.path.startsWith(this.path) &&
                !t.path.replace(this.path, '').includes('/')
            ));

        for (const dir of subdirs) {
            this.size += dir.size
            console.log(dir)
            this.subDirs.set(dir.path.replace(this.path, ''), dir)
        }
    }
}

for (let i = 0; i < input.length; i++) {
    var lines = input[i].split('\n')
    var commandStr = lines.splice(0, 1)[0].trim().split(' ')
    var command = commandStr.splice(0, 1)[0]
    var args = commandStr

    switch (command) {
        case "ls":
            var dir = new directory(lines.join('\n'), fpath + (args[0] ?? ''))
            fileSystem.set(fpath + (args[0] ?? ''), dir, fpath + (args[0] ?? ''))
            dirs.push(dir)
            break;
        case "cd":
            fpath = path.resolve(fpath, (args[0] ?? ''))
            break;
        default:
            console.log(command)
            break;
    }
}

dirs.sort((a, b) => (a.path - b.path))
dirs.reverse()
// dirs.forEach(t => t.initSubDirs())
console.log(dirs.map(t => t.path))

console.log(
    Array.from(
        fileSystem.entries()
    )
        .filter(([path, dir]) => dir.size <= 100000)
        .map(([, a]) => a.size)
        .reduce((a, b) => a + b)
)