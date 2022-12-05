const fs = require('fs')
var winMap = {
    "A": 2,
    "B": 3,
    "C": 1
}
var loseMap = {
    "A": 2,
    "B": 1,
    "C": 3
}

function decodeRPSOpponent(i) {
    switch (i) {
        case "A": return 1;
        case "B": return 2;
        case "C": return 3;
    }
}

function decodeRPSMe(opp, me) {
    switch (me) {
        case "X": // lose
            switch (opp) {
                case "A":
                    return 1
                case "B":
                    return 2
                case "C":
                    return 0
            }
        case "Y": // draw
            return decodeRPSOpponent(opp)
        case "Z": // win
            switch (opp) {
                case "A":
                    return 0
                case "B":
                    return 1
                case "C":
                    return 2
            }
    }
}

var dmap = {X:"Win",Y:"Draw",Z:"Lose"}

/*

ME

1 = ROCK
2 = PAPER
3 = SICCORS

OPP
1 = ROCK
2 = PAPER
3 = SICCORS

A X Rock
B Y Paper
C Z Scissors

*/

function winner(opp, me) {
    if (me === opp) {
        return 0;
    } else if (me === 1 && opp === 2) {
        return 1;
    } else if (me === 2 && opp === 3) {
        return 1;
    } else if (me === 3 && opp === 1) {
        return 1;
    } else {
        return -1;
    }
}

function evalGame(opp, me) {
    var win = winner(me, opp)

    switch (win) {
        case 1: return me + 6;
        case 0: return me + 3;
        case -1: return me;
    }
}

console.log(fs.readFileSync('input.txt', { encoding: 'ascii' })
    .split('\n')
    .map(t =>
        t.split(' '))
    .map((([a, b]) =>
        [decodeRPSOpponent(a), decodeRPSMe(a, b), dmap[b]]))
    .map((t) => evalGame(...t))
    .reduce((a, b) => a + b, 0)
)

