const fs = require('fs')

var chars = Object.fromEntries(Object.entries(Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")).map(([i, c]) => [c, Number(i) + 1]))

var input = fs.readFileSync('input.txt', { encoding: 'ascii' }).split('\n')

var s1 = [[['']]]
var crnt = []

s1 = []

for (const i in input) {
    if (i % 3) {
        crnt.push(Array.from(new Set(Array.from(input[i]))))
    } else {
        s1.push(crnt)
        crnt = [Array.from(new Set(Array.from(input[i])))]
    }
}

s1.shift()

s1 = s1.map(([a, b, c]) => {
    return a
        .filter(t => b.includes(t))
        .filter(t => c.includes(t)) //2790
        .map(t => chars[t])[0]
})

s1.push(44)

console.log(
    s1.reduce((a, b) => a + b, 0)
)