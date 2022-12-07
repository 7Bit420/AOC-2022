const fs = require('fs')

var input = fs.readFileSync('input.txt', { encoding: 'ascii' })

var letters = input.substring(0,4)
var success = 0
for (let i = 4; i < input.length; i++) {
    if (letters.includes(input[i])) {
        success = 0
    } else {
        success++
    }
    letters = letters.substring(1, 4) + input[i]
    if (success == 4) {
        console.log(letters)
        console.log(i)
        break
    }
}
