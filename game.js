var container = document.querySelector('.container');
var showWinner = document.querySelector('.showWinner');
var showWinnerWrap = document.querySelector('.showWinnerWrap');
var newTable = document.createElement('table');
container.appendChild(newTable);
newTable.classList.add('myTable');
let rowsNum = 10;
let colsNum = 10;
var k = 1;
let arr = [];
var gamers = ['gamer1', 'gamer2']
var gamerNum = 0;
for(var i = 0; i<rowsNum; i++){
  arr[i] = [];
  for(var j = 0; j<colsNum; j++){
    arr[i][j] = k;
    k++;
  }
}

var massRows = createTable(arr);
function createTable(arr) {
  var massRows = [];
  var k = 1;
  for(var i = 0; i<arr.length; i++){
    var tr = document.createElement('tr');
    massRows[i] = [];
    for(var j = 0; j<arr[i].length; j++){
      var td = document.createElement('td');
      massRows[i][j] = td;
     // td.innerHTML = k++;
      tr.appendChild(td);
      td.addEventListener('click', cell_color);
    }
    newTable.appendChild(tr);
  }
  return massRows;
}
var massColumns = [];
function getColumns(arr){
  for(var i = 0; i<arr.length; i++){
    for(var j = 0; j<arr[i].length; j++){
      if(massColumns[j]===undefined){
        massColumns[j] = [];
      } 
      massColumns[j][i] = arr[i][j];
    }
  }
}
var massDiagonals = [];
function getDiagonals(arr){
  for (var i = 0; i<arr.length; i++){
    for(var j = 0; j<arr[i].length; j++){
      if(massDiagonals[i+j]===undefined){
        massDiagonals[i+j] = [];
      }
      massDiagonals[i+j].push(arr[i][j]);
    }
  }
}

var massAnotherDiagonals = [];
function getAnotherDiagonals(arr){
  /*получаем перевернутый массив*/
  var reverseMass = [];
  for(var i = 0; i<arr.length; i++){
    reverseMass[i] = arr[i].reverse();
  }
  for (var j = 0; j<reverseMass.length; j++){
      for(var k = 0; k<reverseMass[j].length; k++){
        if(massAnotherDiagonals[j+k]===undefined){
          massAnotherDiagonals[j+k] = [];
        }
        massAnotherDiagonals[j+k].push(reverseMass[j][k]);
      }
    }
}
getColumns(massRows);
getDiagonals(massRows);
getAnotherDiagonals(massRows);
var lines = massRows.concat(massColumns, massDiagonals, massAnotherDiagonals);

function cell_color(){
  this.classList.add(gamers[gamerNum]);
  gamerNum++;  
  if(gamerNum == gamers.length){
    gamerNum = 0;
  }
  this.removeEventListener('click', cell_color);
}
function checkWin(lines, gamer) {
  for(var i = 0; i<lines.length; i++){
    for(var j = 4; j<lines[i].length; j++){
      if(lines[i][j-4].classList.contains(gamer)
      &&lines[i][j-3].classList.contains(gamer)
      &&lines[i][j-2].classList.contains(gamer)
      &&lines[i][j-1].classList.contains(gamer)
      &&lines[i][j].classList.contains(gamer)){
        return true;
      }
    }
  }
  return false;
}
function isWin(lines, gamers) {
  for (var i=0; i<gamers.length; i++){
    if(checkWin(lines, gamers[i])){
      endGame(gamers[i]);
      break;
    }
  }
}
function endGame(gamers) {
  showWinnerWrap.style.backgroundColor = 'red';
  showWinner.innerHTML = 'Победил игрок ' + gamers;
  stopPlay(massRows);
}
function stopPlay(arr) {
  for(var i = 0; i<arr.length; i++){
    for(var j = 0; j<arr[i].length; j++){
      arr[i][j].removeEventListener('click', cell_color);
    }
  }
}
