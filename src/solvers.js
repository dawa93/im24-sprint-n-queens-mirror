/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// n이 주어졌을 때 n rooks 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNRooksSolution = function(n) {
  // const solution = new Board({ n: n });

  // for (let i = 0; i < n; i++) {
  //   solution.togglePiece(i, i);
  // }

  // 리커션으로 해당 행을 탐색한다.
  // 빠져나오는 조건(base case) : row 가 n 과 같으면, 리턴;
  // 그렇지 않으면,
  // 반복문을 사용해서 col을 0 부터 n 까지 탐색한다.
  // 해당 좌표에서 해당 말을 놓는다. (0,0)에
  // 만약 충돌이 발생하지 않는다면, 그 다음 행열(row +1)에 리커션을 사용해서 탐색한다.

  let solution = undefined; // fixme
  let board = new Board({ n: n });
  let flag = Array(n).fill(0);

  function recursion(row) {
    if (row === n) {
      return (solution = board.rows());
    } else {
      for (let col = 0; col < n; col++) {
        if (flag[col] === 1) {
          continue;
        }
        board.togglePiece(row, col);
        flag[col] = 1;
        if (!board.hasAnyRooksConflicts()) {
          recursion(row + 1);
        }
        if (solution !== undefined) {
          return;
        }
        board.togglePiece(row, col);
        flag[col] = 0;
      }
    }
  }
  recursion(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// n이 주어졌을 때 n rooks 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNRooksSolutions = function(n) {
  let solutionCount = 0; // fixme
  let board = new Board({ n: n });
  let flag = Array(n).fill(0);

  function recursion(row) {
    if (row === n) {
      return solutionCount++;
    } else {
      for (let col = 0; col < n; col++) {
        if (flag[col] === 1) {
          continue;
        }
        board.togglePiece(row, col);
        flag[col] = 1;

        if (!board.hasAnyRooksConflicts()) {
          recursion(row + 1);
        }
        board.togglePiece(row, col);
        flag[col] = 0;
      }
    }
  }
  recursion(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// n이 주어졌을 때 n queens 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNQueensSolution = function(n) {
  let solution = undefined; // fixme
  let board = new Board({ n: n });
  let flag = Array(n).fill(0);

  if (n === 2 || n === 3) {
    return board.rows();
  }

  function recursion(row) {
    if (row === n) {
      return (solution = board.rows());
    } else {
      for (let col = 0; col < n; col++) {
        if (flag[col] === 1) {
          continue;
        }
        board.togglePiece(row, col);
        flag[col] = 1;

        if (!board.hasAnyQueensConflicts()) {
          recursion(row + 1);
        }
        if (solution !== undefined) {
          return;
        }
        board.togglePiece(row, col);
        flag[col] = 0;
      }
    }
  }

  recursion(0);

  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution;
};

// n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNQueensSolutions = function(n) {
  let solutionCount = 0; // fixme
  let board = new Board({ n: n });
  let flag = Array(n).fill(0);

  function recursion(row) {
    if (row === n) {
      return solutionCount++;
    } else {
      for (let col = 0; col < n; col++) {
        if (flag[col] === 1) {
          continue;
        }
        board.togglePiece(row, col);
        flag[col] = 1;

        if (!board.hasAnyQueensConflicts()) {
          recursion(row + 1);
        }
        board.togglePiece(row, col);
        flag[col] = 0;
      }
    }
  }
  recursion(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
