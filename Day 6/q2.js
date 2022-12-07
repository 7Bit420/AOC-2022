const fs = require('fs')

var input = fs.readFileSync('input.txt', { encoding: 'ascii' })

const distlen = 14

var letters = input.substring(0, distlen)
var success = 0
for (let i = distlen; i < input.length; i++) {
    console.log(letters, input[i], i, success)
    if (success == (distlen - 1)) {
        console.log(letters)
        console.log(i)
        break
    }
    if (letters.includes(input[i])) {
        success = 0
    } else {
        success++
    }
    letters = letters.substring(1, distlen) + input[i]
}

// 3588 jpwjchvzbmrflc