var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};


function isvalid(board,row,col,val){
  for(let i=0;i<9;i++){
      if(board[row][i]==val){
          return false;
      }
      if(board[i][col]==val){
          return false;
      }
      const gridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const gridCol = 3 * Math.floor(col / 3) + i % 3;
      if (board[gridRow][gridCol] == val) {
          return false;
      }
  }
  return true;
}

function SudokuSolver(board,i, j,n){
  if(i==8 && j==9){
      FillBoard(board)
      return true;
  }
  if(j==n){
      return SudokuSolver(board,i+1,0,n);
  }
  if(board[i][j]!=0){
      return SudokuSolver(board,i,j+1,n);
  }
  for(let val=1;val<=9;val++){
      if(isvalid(board,i,j,val)){
          board[i][j]=val;
          let next=SudokuSolver(board,i,j+1,n);
          if(next){
              return true;
          }
          board[i][j]=0;
      }
  }
  return false;
}