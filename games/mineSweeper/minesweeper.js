/*
 * Playing a game of MineSweeper in your terminal.
 *
 * Not a lot of errors handling so please play with good intention only 😄
 *
 * Works with Node.js
 *
 */
const readlinePromises = require("node:readline/promises");

const createBoard = (size) => {
  // initialize board
  const board = new Array(size);
  const maskedBoard = new Array(size);
  for (let i = 0; i < board.length; i++) {
    board[i] = [];
    maskedBoard[i] = [];
  }

  // initialize bomb
  let counter = size;
  while (counter > 0) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    board[x][y] = "💣";
    counter--;
  }

  // initialize hints
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== "💣") {
        board[i][j] = getNumberOfBomb(board, i, j).toString();
      }
    }
  }

  // create maskedBoard
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      maskedBoard[i][j] = "X";
    }
  }

  return [board, maskedBoard];
};

const getNumberOfBomb = (board, i, j) => {
  const tiles = [];
  if (board[i - 1]) {
    tiles.push(board[i - 1][j - 1]); //topLeft
    tiles.push(board[i - 1][j]); //top
    tiles.push(board[i - 1][j + 1]); //topRight
  }

  tiles.push(board[i][j - 1]); //left
  tiles.push(board[i][j + 1]); //right

  if (board[i + 1]) {
    tiles.push(board[i + 1][j - 1]); //bottomLeft
    tiles.push(board[i + 1][j]); //bottom
    tiles.push(board[i + 1][j + 1]); //bottomRight
  }

  return tiles.filter((tile) => tile === "💣").length;
};

const playGame = async () => {
  const boardSize = 6;
  const [board, maskedBoard] = createBoard(6);
  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let bombCounter = boardSize;
  let alive = true;

  console.log("Welcome to small-js-thing MineSweeper. Here's your board");
  // uncomment here if you want to peak at the real board
  //console.log(board);
  console.log(maskedBoard);

  while (alive && bombCounter > 0) {
    const answer = await rl.question(`What's your choice?
    1. Open
    2. Flag
    3. Unflag
    4. Exit
    `);

    if (answer === "1" || answer === "2" || answer === "3") {
      const i = parseInt(await rl.question(`What's Y position?`));
      const j = parseInt(await rl.question(`What's X position?`));

      if (answer === "1") {
        // open
        if (maskedBoard[i][j] !== "🚩") {
          maskedBoard[i][j] = board[i][j];
        }
        if (board[i][j] === "💣") {
          alive = false;
        }
      } else if (answer === "2") {
        // flag
        if (maskedBoard[i][j] === "X") {
          maskedBoard[i][j] = "🚩";
        }
        if (board[i][j] === "💣") {
          bombCounter -= 1;
        }
      } else if (answer === "3") {
        // unflag
        if (maskedBoard[i][j] === "🚩") {
          maskedBoard[i][j] = "X";
        }
        if (board[i][j] === "💣") {
          bombCounter += 1;
        }
      }
    } else {
      process.exit();
    }

    console.log(maskedBoard);
  }

  if (!alive) {
    console.log("💣💣💣You died! Better luck next time💣💣💣");
  } else {
    console.log("🚩🚩🚩You beat the game. Congrats!🚩🚩🚩");
  }

  rl.close();
};

playGame();
