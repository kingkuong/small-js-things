const generateProbability = (noOfRoller, noOfPossibilities) => {
  return Math.pow(1 / noOfPossibilities, noOfRoller);
};

const isWinning = (resultRollers, winningNumber) => {
  const set = new Set(resultRollers);
  return (winning = set.size === 1 && set.has(winningNumber));
};

const runRoller = (noOfRoller, roller) => {
  const result = [];
  for (let i = 0; i < noOfRoller; i++) {
    const slotIndex = Math.floor(Math.random() * roller.length);
    const slottedNumber = roller[slotIndex];
    result.push(slottedNumber);
  }

  return result;
};

/*
 * noOfRoller = 3
 * roller with Weighted outcome
 * 19 possibilities
 * 1/19 ^ 3 chance of winning
 * Only win if roller hits 7
 *
 * By changing the noOfRoller & the content of roller, we control what's the possibility winning is
 */
const roller = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7];
//const roller = [1, 1, 2, 2, 3, 3, 7];
//const roller = [1, 2, 3, 4, 5, 6, 7];
const noOfRoller = 3;
const winningNumber = 7;
const winningProbability = generateProbability(noOfRoller, roller.length);
const cost = 1; //dollar
let totalCost = 0; //dollar
let winning = false;

const payOut = Math.ceil(cost * (1 / winningProbability));

while (!winning) {
  totalCost += cost;
  let result = runRoller(noOfRoller, roller);
  winning = isWinning(result, winningNumber, totalCost, payOut);

  // ensure the house always win ;)
  while (winning) {
    if (totalCost > payOut) {
      console.log("===== Congrats, you win =====");
      break;
    } else {
      result = runRoller(noOfRoller, roller);
      winning = isWinning(result, winningNumber, totalCost, payOut);
    }
  }

  console.log("----- result ----");
  console.log(result);
  console.log("-----------------");
}

console.log("Your payout is ", payOut, " dollars");
console.log("Your cost is ", totalCost, " dollars");
