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

// 리커션으로 해당 행을 탐색한다.
// 빠져나오는 조건(base case) : row 가 n 과 같으면, 리턴;
// 그렇지 않으면,
// 반복문을 사용해서 col을 0 부터 n 까지 탐색한다.
// 해당 좌표에서 해당 말을 놓는다. (0,0)에
// 만약 충돌이 발생하지 않는다면, 그 다음 행열(row +1)에 리커션을 사용해서 탐색한다.
window.findNRooksSolution = function(n) {
  // 체스판에 룩을 위치했을때, 충돌이 나는지 아닌지를 확인한다.
  //
  // how? 첫번째 행에 룩을올려둔다. 같은 행에 룩이 있다면 다음 행으로 넘어간다.
  //      다음 행에 룩을 올려두고, 충돌이 나지 않으면 다음 행으로 넘어간다.
  //      그 다음 행에도 룩을 올려두고 충돌이 나지않으면 다음행으로 넘어간다.
  //      위와 같은 프로세스를 행렬 끝까지 계속 반복한다.
  //

  //새로운 보드를 생성한다.
  let solution = new Board({ n: n });
  function recursion(row) {
    //base case : n 과 row 가 같으면 그만.  n=4 이면, 배열은 3번 인덱스까지이다.
    // 끝 배열까지 가게된다면, 이 재귀를 그만하고, 기록해둔  solution배열을 리턴한다.
    if (row === n) {
      return solution;
    }
    for (let col = 0; col < n; col++) {
      // 새로운 룩을 위치시킨다.
      solution.togglePiece(row, col);
      // 룩을 위치시켰을때, 충돌이 나지않으면, 다음 행렬로 넘어간다.
      if (!solution.hasAnyRooksConflicts()) {
        recursion(row + 1);
      } else {
        // 충돌이 난다면, 올려두었던 룩을 제거한다.
        solution.togglePiece(row, col);
      }
    }
  }
  recursion(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// n이 주어졌을 때 n rooks 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNRooksSolutions = function(n) {
  let solutionCount = 0; // fixme
  let board = new Board({ n: n });

  function recursion(row) {
    if (row === n) {
      return solutionCount++;
    }

    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        recursion(row + 1);
      }
      board.togglePiece(row, col);
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

  if (n === 2 || n === 3) {
    return board.rows();
  }

  function recursion(row) {
    if (row === n) {
      solution = board;
      return solution;
    }

    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        recursion(row + 1);
      }
      if (solution !== undefined) {
        return;
      }
      board.togglePiece(row, col);
    }
  }
  recursion(0);
  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution.rows();
  //
};

// n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNQueensSolutions = function(n) {
  let solutionCount = 0; // fixme
  let board = new Board({ n: n });

  // if (n === 3 || n === 2) {
  //   return board.rows();
  // }

  // function recursion(row) {
  //   if (n === row) {
  //     solutionCount++;
  //   }

  //   for (let col = 0; col < n; col++) {
  //     board.togglePiece(row, col);
  //     if (!board.hasAnyQueensConflicts()) {
  //       recursion(row + 1);
  //     }

  //     board.togglePiece(row, col);
  //   }
  // }

  function recursion(row) {
    if (n === row) {
      solutionCount++;
      return;
    }

    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        recursion(row + 1);
      }

      board.togglePiece(row, col);
    }
  }

  recursion(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// 페어분들과 같이 풀어본 스프린트

// window.findNRooksSolution = function(n) {
//   // 리커션으로 해당 행을 탐색한다.
//   // 빠져나오는 조건(base case) : row 가 n 과 같으면, 리턴;
//   // 그렇지 않으면,
//   // 반복문을 사용해서 col을 0 부터 n 까지 탐색한다.
//   // 해당 좌표에서 해당 말을 놓는다. (0,0)에
//   // 만약 충돌이 발생하지 않는다면, 그 다음 행열(row +1)에 리커션을 사용해서 탐색한다.

//   let solution = undefined; // fixme
//   let board = new Board({ n: n });
//   let flag = Array(n).fill(0);

//   function recursion(row) {
//     if (row === n) {
//       return (solution = board.rows());
//     } else {
//       for (let col = 0; col < n; col++) {
//         if (flag[col] === 1) {
//           continue;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 1;
//         if (!board.hasAnyRooksConflicts()) {
//           recursion(row + 1);
//         }
//         if (solution !== undefined) {
//           return;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 0;
//       }
//     }
//   }
//   recursion(0);
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };

// // n이 주어졌을 때 n rooks 문제의 전체 해답 개수를 반환합니다.
// // 반환 값은 정수입니다.
// window.countNRooksSolutions = function(n) {
//   let solutionCount = 0; // fixme
//   let board = new Board({ n: n });
//   let flag = Array(n).fill(0);

//   function recursion(row) {
//     if (row === n) {
//       return solutionCount++;
//     } else {
//       for (let col = 0; col < n; col++) {
//         if (flag[col] === 1) {
//           continue;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 1;

//         if (!board.hasAnyRooksConflicts()) {
//           recursion(row + 1);
//         }
//         board.togglePiece(row, col);
//         flag[col] = 0;
//       }
//     }
//   }
//   recursion(0);
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// // n이 주어졌을 때 n queens 문제의 해답 한 개를 반환합니다.
// // 반환 값은 체스 판을 나타내는 2차원 배열입니다.
// window.findNQueensSolution = function(n) {
//   let solution = undefined; // fixme
//   let board = new Board({ n: n });
//   let flag = Array(n).fill(0);

//   if (n === 2 || n === 3) {
//     return board.rows();
//   }

//   function recursion(row) {
//     if (row === n) {
//       return (solution = board.rows());
//     } else {
//       for (let col = 0; col < n; col++) {
//         if (flag[col] === 1) {
//           continue;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 1;

//         if (!board.hasAnyQueensConflicts()) {
//           recursion(row + 1);
//         }
//         if (solution !== undefined) {
//           return;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 0;
//       }
//     }
//   }

//   recursion(0);

//   console.log(
//     'Single solution for ' + n + ' queens:',
//     JSON.stringify(solution)
//   );
//   return solution;
// };

// // n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// // 반환 값은 정수입니다.
// window.countNQueensSolutions = function(n) {
//   let solutionCount = 0; // fixme
//   let board = new Board({ n: n });
//   let flag = Array(n).fill(0);

//   function recursion(row) {
//     if (row === n) {
//       return solutionCount++;
//     } else {
//       for (let col = 0; col < n; col++) {
//         if (flag[col] === 1) {
//           continue;
//         }
//         board.togglePiece(row, col);
//         flag[col] = 1;

//         if (!board.hasAnyQueensConflicts()) {
//           recursion(row + 1);
//         }
//         board.togglePiece(row, col);
//         flag[col] = 0;
//       }
//     }
//   }
//   recursion(0);

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
