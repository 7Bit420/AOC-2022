/*

Convert the following haskell to js

data RPS = Rock | Paper | Scissors deriving (Eq)

data Outcome = Win | Lose | Draw deriving (Eq)

decryptTheir :: String -> RPS
decryptTheir "A" = Rock
decryptTheir "B" = Paper
decryptTheir "C" = Scissors
decryptTheir x = error $ x

decryptYour :: String -> Outcome
decryptYour "X" = Lose
decryptYour "Y" = Draw
decryptYour "Z" = Win

scoreOutcome :: RPS -> Outcome -> Integer
scoreOutcome _ Win = 6
scoreOutcome _ Draw = 3
scoreOutcome _ Lose = 0

getChoice :: RPS -> Outcome -> RPS
getChoice x Draw = x
getChoice Rock Win = Paper
getChoice Paper Win = Scissors
getChoice Scissors Win = Rock
getChoice x Lose = getChoice (getChoice x Win) Win

scoreChoice :: RPS -> Integer
scoreChoice Rock = 1
scoreChoice Paper = 2
scoreChoice Scissors = 3

scoreRound :: RPS -> Outcome -> Integer
scoreRound x y = scoreChoice (getChoice x y) + scoreOutcome x y

processLine :: String -> Integer
processLine s = scoreRound (decryptTheir x) (decryptYour y) where
	[x,y] = words s

main :: IO ()
main = interact $ show . sum . map processLine . lines

*/

const { readFileSync } = require("fs");

var RPS = {
	Rock: 0,
	Paper: 1,
	Scissors: 2
};

var Outcome = {
	Win: 0,
	Lose: 1,
	Draw: 2
};

function decryptTheir(s) {
	switch (s) {
		case "A": return 0;
		case "B": return 1;
		case "C": return 2;
		default: throw new Error(s);
	}
}

function decryptYour(s) {
	switch (s) {
		case "X": return Outcome.Lose;
		case "Y": return Outcome.Draw;
		case "Z": return Outcome.Win;
		default: throw new Error(s);
	}
}

function scoreOutcome(rps, outcome) {
	switch (outcome) {
		case Outcome.Win: return 6;
		case Outcome.Draw: return 3;
		case Outcome.Lose: return 0;
		default: throw new Error(outcome);
	}
}

function getChoice(rps, outcome) {
	switch (outcome) {
		case Outcome.Draw: return rps;
		case Outcome.Win:
			switch (rps) {
				case 0: return 1;
				case 1: return 2;
				case 2: return 0;
				default: throw new Error(rps);
			}
		case Outcome.Lose: return getChoice(getChoice(rps, Outcome.Win), Outcome.Win);
		default: throw new Error(outcome);
	}
}

function scoreChoice(rps) {
	switch (rps) {
		case 0: return 1;
		case 1: return 2;
		case 2: return 3;
		default: throw new Error(rps);
	}
}

function scoreRound(rps, outcome) {
	return scoreChoice(getChoice(rps, outcome)) + scoreOutcome(rps, outcome);
}

function processLine(s) {
	var x = decryptTheir(s[0]);
	var y = decryptYour(s[2]);
	return scoreRound(x, y);
}

function main(s) {
	return s.split("\n").map(processLine).reduce(function(a, b) { return a + b; }, 0);
}

console.log(main(readFileSync('input.txt', {encoding:'ascii'})));