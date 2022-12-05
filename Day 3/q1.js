const fs = require('fs')

var chars = Object.fromEntries(Object.entries(Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")).map(([i, c]) => [c, Number(i)+1]))

var input = fs.readFileSync('input.txt', { encoding: 'ascii' })

console.log(
    input.split('\n')
        .map((t) => [t.substring(0, t.length / 2), t.substring(t.length / 2)])
        .map(([a, b]) => Array.from(a).find(t => b.includes(t)))
        .map(t => chars[t])
        .reduce((a, b) => a + b, 0)
)
