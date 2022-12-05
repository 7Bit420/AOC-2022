const fs = require('fs')

console.log(fs.readFileSync('input.txt', { encoding: 'ascii' })
    .split('\n')
    .map(t =>
        t.split(',')
            .map(t =>
                t.split('-')
                    .map(t => Number(t))
            ))
    .map(([a, b]) => (
        (a[0] >= b[0] && a[1] <= b[1]) ||
        (a[0] <= b[0] && a[1] >= b[1])
    ))
    .filter(t=>t).length
    )